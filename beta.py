from copernicus import *
from util import *


# Road class to represent different types of routes
class Road:
    def __init__(self, length_km, truck_access, is_straight_line):
        self.length_km = length_km
        self.truck_access = truck_access
        self.is_straight_line = is_straight_line

    def __repr__(self):
        return f"Road(length={self.length_km}, truck_access={self.truck_access}, is_straight_line={self.is_straight_line})"

# Define the default roads outside of the function as a constant
DEFAULT_ROADS = [
    Road(length_km=300, truck_access=True, is_straight_line=False),
    Road(length_km=200, truck_access=False, is_straight_line=True),
    Road(length_km=100, truck_access=True, is_straight_line=True),
]

# Define the default vehicle specs outside of the function as a constant
DEFAULT_VEHICLE_SPECS = {
    'car': {
        'speed': 80,
        'max_weight': 200,
        'max_dimensions': (100, 100, 75),
        'max_rain': 20,
        'max_wind': 10,
        'average_fuel_consumption': 6.5
    },
    'truck': {
        'speed': 60,
        'max_weight': 20000,
        'max_dimensions': (1360, 245, 260),
        'max_rain': 20,
        'max_wind': 10,
        'average_fuel_consumption': 30.0
    },
    'drone': {
        'speed': 100,
        'max_weight': 5,
        'max_dimensions': (60, 60, 30),
        'max_rain': 1.5,
        'max_wind': 5,
        'energy_cost_per_km': 0.05
    },
    'van': {
        'speed': 90,
        'max_weight': 1200,
        'max_dimensions': (240, 170, 140),
        'max_rain': 20,
        'max_wind': 10,
        'average_fuel_consumption': 10.0
    },
    'helicopter': {
        'speed': 250, 
        'max_weight': 1000,  
        'max_dimensions': (300, 120, 150),
        'max_rain': 8,
        'max_wind': 10,
        'average_fuel_consumption': 100,  
    },
    'gas_price': 1.50  # Average price of fuel per liter
}

# Function to calculate cost per km based on vehicle type and its specs
def calculate_cost_per_km(vehicle_type, road_length_km, specs):
    if vehicle_type in ['car', 'truck', 'van', 'helicopter']:
        if vehicle_type == 'helicopter':
            fuel_consumption_per_hour = specs[vehicle_type]['average_fuel_consumption']
            fuel_consumption_per_km = fuel_consumption_per_hour / specs[vehicle_type]['speed']
        else:
            fuel_consumption_per_km = specs[vehicle_type]['average_fuel_consumption'] / 100

        cost_per_km = fuel_consumption_per_km * specs['gas_price']
    elif vehicle_type == 'drone':
        cost_per_km = specs[vehicle_type]['energy_cost_per_km']
    else:
        raise ValueError("Invalid vehicle type")

    return cost_per_km * road_length_km

# Function to calculate travel time based on road and vehicle
def calculate_travel_time(road, vehicle_type, specs):
    if vehicle_type == 'truck' and not road.truck_access:
        raise ValueError("Trucks cannot travel on this road.")
    if vehicle_type == 'drone' and not road.is_straight_line:
        raise ValueError("Drones can only travel on straight line routes.")
    return road.length_km / specs[vehicle_type]['speed']

# (The rest of the code remains unchanged.)

# Run the program

# HumanitarianAid class for aid package properties
class HumanitarianAid:
    def __init__(self, dimensions, weight, aid_type, temp_range, critical_time):
        self.dimensions = dimensions  # dimensions as a tuple (length, width, height)
        self.weight = weight
        self.aid_type = aid_type
        self.temp_range = temp_range
        self.critical_time = critical_time

    def package_fits(self, vehicle_dimensions):
        # Sort package and vehicle dimensions
        package_sorted = sorted(self.dimensions)
        vehicle_sorted = sorted(vehicle_dimensions)
        # Check if package fits in the vehicle by comparing sorted dimensions
        return all(p <= v for p, v in zip(package_sorted, vehicle_sorted))

    # Method to get transport options based on the roads and vehicle specs
    def get_all_transport_options(self, specs, roads, criticalTime ,wind, rain):
        transport_options = {}
        for vehicle in specs:
            if vehicle == 'gas_price':
                continue  # Skip the gas_price key

            max_dimensions = specs[vehicle]['max_dimensions']
            max_weight = specs[vehicle]['max_weight']

            max_wind = specs[vehicle]['max_wind']
            max_rain = specs[vehicle]['max_rain']

            # Check if the aid package is too heavy for the vehicle
            if self.weight > max_weight:
                transport_options[vehicle] = f"Package too heavy for {vehicle}. Max weight: {max_weight} kg"
                continue

            if wind > max_wind:
                transport_options[vehicle] = f"Wind is too strong for {vehicle}. Max value is: {max_wind} m/s"
                continue

            if rain > max_rain:
                transport_options[vehicle] = f"Rain is too much for {vehicle}. Max value is: {max_rain} m."
                continue

            # Check if the aid package can fit in the vehicle
            if not self.package_fits(max_dimensions):
                max_dimensions_str = " x ".join(map(str, max_dimensions))
                transport_options[vehicle] = f"Package too large for {vehicle}. Max dimensions: {max_dimensions_str} cm"
                continue


            # Determine if a suitable road is available
            suitable_road = next((road for road in roads if (
                (vehicle != 'drone' and road.truck_access) or
                (vehicle == 'drone' and road.is_straight_line)
            )), None)

            if suitable_road:
                time = calculate_travel_time(suitable_road, vehicle, specs)
                if time > criticalTime:
                    transport_options[vehicle] = f"Mean of transport too slow by { round((time - criticalTime),2) } hours"
                    continue
                cost = calculate_cost_per_km(vehicle, suitable_road.length_km, specs)
                transport_options[vehicle] = (time, cost, "Available")
            else:
                transport_options[vehicle] = f"No suitable roads available for {vehicle}"
            
            

        return transport_options

# Function to calculate transport options for a given aid package
def calculate_transport_options(aid_package, specs=DEFAULT_VEHICLE_SPECS, roads=DEFAULT_ROADS, critical_time = float('inf'), wind=0, rain=0. ):
    return aid_package.get_all_transport_options(specs, roads, critical_time , wind, rain)

# The main function where the program starts
def main(package_dimensions_cm, package_weight, criticalTime, A, B):
    road1 = shortest_path( A, B )
    road2 = truckAccesiblePath( A, B )
    road3 = euklidesPath( A, B )
    Road1 = Road( road1[0], road1[1], road1[2] )
    Road2 = Road( road2[0], road2[1], road2[2] )
    Road3 = Road( road3[0], road3[1], road3[2] )
    my_roads = [ Road1, Road2, Road3 ]

    temperatureData, uwindData, vwindData, rainData, lat, lon = load_copernicus_data('copernicusData.nc')
    tempValue = get_temperature(A[0], A[1], temperatureData, lat, lon)
    uWindValue = get_uwind(A[0], A[1], uwindData, lat, lon)
    vWindValue = get_vwind(A[0], A[1], vwindData, lat, lon)
    rainValue = get_rain(A[0], A[1], rainData, lat, lon)

    windspeed = (uWindValue**2 + vWindValue**2)**(1/2)

    if package_dimensions_cm is None or package_weight is None:
        print("Invalid dimensions or weight entered. Exiting program.")
        return

    # Creating a user-defined aid package
    aid_package = HumanitarianAid(
        dimensions=package_dimensions_cm,
        weight=package_weight,
        aid_type='Medical Supplies',
        temp_range=(2, 8),  # Celsius
        critical_time=48    # hours
    )

    # Get all transport options for the user-defined package
    transport_options = calculate_transport_options(aid_package, roads = my_roads, critical_time = criticalTime, wind = windspeed, rain = rainValue)

    s = ""
    for vehicle, option in transport_options.items():
        if isinstance(option, tuple) and option[2] == "Available":
            time, cost, _ = option
            s +=  f"{vehicle.title()} - Time: {time:.2f} hours, Cost: ${cost:.2f}" + "@"
        else:
            s += (f"{vehicle.title()} - Not available: {option}") + "@"
    return s

# Run the program
if __name__ == "__main__":
    a = main((0,0,0),0,0,(10.5354,14.1675),(10.5915,14.3130))
    print("ODPOWIEDZ")
    print(a)

