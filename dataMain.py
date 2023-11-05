from copernicus import *

# Example variables
desired_latitude = 1.05
desired_longitude = 13.31

# Loading the entire temperature, u-wind, v-wind, rain/snow data and determining their values
# u-wind -> east-west component of wind | v-wind -> north-south component of wind
temperatureData, uwindData, vwindData, rainData, lat, lon = load_copernicus_data('copernicusData.nc')
tempValue = get_temperature(desired_latitude, desired_longitude, temperatureData, lat, lon)
uWindValue = get_uwind(desired_latitude, desired_longitude, uwindData, lat, lon)
vWindValue = get_vwind(desired_latitude, desired_longitude, vwindData, lat, lon)
rainValue = get_rain(desired_latitude, desired_longitude, rainData, lat, lon)

print(f"Position: {desired_latitude} | {desired_longitude}")
print(f"Temperature: {tempValue}")  # [celsius]
print(f"U-Wind: {uWindValue}")  # [m/s]
print(f"V-Wind: {vWindValue}")  # [m/s]
print(f"Rain/snow: {rainValue*1000}")  # [meters]
