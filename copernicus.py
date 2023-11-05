from os import path
import netCDF4 as nC
import numpy as np
import cdsapi


# Loads the data about temperatures, their corresponding latitudes and longitudes into variables
def load_copernicus_data(filename: str, update_data_from_api: bool = False):
    if update_data_from_api or not path.exists(filename):  # If true or file doesn't exist we download the data from API
        c = cdsapi.Client()

        c.retrieve(
            'reanalysis-era5-land-monthly-means',
            {
                'variable': ['soil_temperature_level_1', '10m_u_component_of_wind', '10m_v_component_of_wind',
                             'total_precipitation', ],
                'year': '2023',
                'month': '09',  # Latest available data
                'time': '12:00',
                'area': [
                    37.32, -17.47, -34.83,
                    51.43,  # Africa continent coordinates
                ],
                'format': 'netcdf',
                'product_type': 'monthly_averaged_reanalysis_by_hour_of_day',
            },
            filename)

    # Open the NetCDF file
    nc_file = nC.Dataset(filename, 'r')

    # Access specific variables
    variable_temp = nc_file.variables['stl1']
    variable_uwind = nc_file.variables['u10']
    variable_vwind = nc_file.variables['v10']
    variable_rain = nc_file.variables['tp']

    # Get the variable's data as NumPy arrays
    data_temp = variable_temp[:]
    data_uwind = variable_uwind[:]
    data_vwind = variable_vwind[:]
    data_rain = variable_rain[:]

    # Flatten the 3D data to 2D
    data_2d_temp = data_temp[0, :, :]
    data_2d_uwind = data_uwind[0, :, :]
    data_2d_vwind = data_vwind[0, :, :]
    data_2d_rain = data_rain[0, :, :]

    # Get latitude and longitude information from the NetCDF file
    lat = nc_file.variables['latitude'][:]
    lon = nc_file.variables['longitude'][:]

    # Close the NetCDF file
    nc_file.close()
    return data_2d_temp, data_2d_uwind, data_2d_vwind, data_2d_rain, lat, lon


# Returns the proper temperature based on the latitude and longitude
def get_temperature(latitude: float, longitude: float, temperature_data, lat, lon, kelwin: bool = False) -> float:
    # Find the indices that correspond to the desired latitude and longitude values
    latitude_index = np.abs(lat - latitude).argmin()
    longitude_index = np.abs(lon - longitude).argmin()

    # Determine the temperature at the specified latitude and longitude
    result = temperature_data.data[latitude_index, longitude_index]

    # If kelwin=false, function returns Celsius degrees
    if not kelwin:
        result -= 273.15
    return round(result, 2)  # Returns the temperature rounded to 0.01


# Returns the velocity of u-wind based on the latitude and longitude
def get_uwind(latitude: float, longitude: float, uwind_data, lat, lon, absolute: bool = True) -> float:
    # Find the indices that correspond to the desired latitude and longitude values
    latitude_index = np.abs(lat - latitude).argmin()
    longitude_index = np.abs(lon - longitude).argmin()

    # Determine the temperature at the specified latitude and longitude
    result = uwind_data.data[latitude_index, longitude_index]

    if absolute:
        result = abs(result)
    return round(result, 4)


# Returns the velocity of u-wind based on the latitude and longitude
def get_vwind(latitude: float, longitude: float, vwind_data, lat, lon, absolute: bool = True) -> float:
    # Find the indices that correspond to the desired latitude and longitude values
    latitude_index = np.abs(lat - latitude).argmin()
    longitude_index = np.abs(lon - longitude).argmin()

    # Determine the temperature at the specified latitude and longitude
    result = vwind_data.data[latitude_index, longitude_index]

    if absolute:
        result = abs(result)
    return round(result, 4)


# Returns the amount of rain/snow based on the latitude and longitude
def get_rain(latitude: float, longitude: float, rain_data, lat, lon) -> float:
    # Find the indices that correspond to the desired latitude and longitude values
    latitude_index = np.abs(lat - latitude).argmin()
    longitude_index = np.abs(lon - longitude).argmin()

    # Determine the temperature at the specified latitude and longitude, then return it
    return round(rain_data.data[latitude_index, longitude_index], 4)
