import osmnx as ox
import networkx as nx
from geopy.geocoders import Nominatim
import pyproj


def count_lenght(route: list, graph):
    # Initialize the total length of the road
    total_length = 0.0

    # Iterate through the nodes in the route to calculate the length of the road
    for i in range(len(route) - 1):
        start_node = route[i]
        end_node = route[i + 1]

        # Get the length (in meters) of the edge between the current and next node
        edge_length = graph[start_node][end_node][0].get('length', 0)

        # Accumulate the edge length to the total length
        total_length += edge_length

    return total_length / 1000


def get_route(source_coords: tuple, dest_coords: tuple, is_truck: bool):
    # Specify the source and destination coordinates as latitude and longitude

    # Initialize the Nominatim geocoder
    geolocator = Nominatim(user_agent="shortest_path_calculator")

    # Use reverse geocoding to find the nearest network nodes to the specified coordinates
    source_location = geolocator.reverse(source_coords, exactly_one=True)
    dest_location = geolocator.reverse(dest_coords, exactly_one=True)

    if source_location and dest_location:
        source_address = source_location.address
        dest_address = dest_location.address

        print(f"Source location: {source_address}")
        print(f"Destination location: {dest_address}")

        trucky = is_truck

        if trucky:
            filter = "['highway'~'motorway|trunk|primary|secondary|tertiary']"
        else:
            filter = "['highway'~'motorway|trunk|primary|secondary|tertiary|service|track']"

        # Use osmnx to retrieve the street network for the specified area
        print(source_address)
        graph = ox.graph_from_point(source_coords, dist=50000, network_type='drive', custom_filter=filter)

        # Find the nearest network nodes to the source and destination locations
        orig = ox.distance.nearest_nodes(graph, source_coords[1], source_coords[0])
        dest = ox.distance.nearest_nodes(graph, dest_coords[1], dest_coords[0])

        # Calculate the shortest path using networkx
        route = nx.shortest_path(graph, orig, dest, weight='length')

        ox.plot.plot_graph_route(graph, route)

        # Print the shortest path
        print("Shortest path nodes:", route)

    else:
        raise Exception("nie ma takiej trasy")

    return route, graph


def count_eqlidean_lenght(source_coords, dest_coords):
    wgs84 = pyproj.CRS("EPSG:4326")
    utm = pyproj.CRS("EPSG:32633")

    x1, y1, x2, y2 = source_coords[0], source_coords[1], dest_coords[0], dest_coords[1]

    transformer = pyproj.Transformer.from_crs(wgs84, utm, always_xy=True)

    x1, y1 = transformer.transform(x1, y1)

    x2, y2 = transformer.transform(x2, y2)

    length = ox.distance.euclidean(x1, y1, x2, y2)

    return length / 1000


def shortest_path(source_coords: tuple, dest_coords: tuple) -> list:
    is_truckacess = False
    is_straightline = False

    try:
        route, graph = get_route(source_coords, dest_coords, is_truckacess)
        length = count_lenght(route, graph)
    except:
        lenght = -1

    return [length, is_truckacess, is_straightline]


def truckAccesiblePath(source_coords: tuple, dest_coords: tuple) -> list:
    is_truckacess = True
    is_straightline = False

    try:
        route, graph = get_route(source_coords, dest_coords, is_truckacess)
        length = count_lenght(route, graph)
    except:
        lenght = -1

    return [length, is_truckacess, is_straightline]


def euklidesPath(source_coords, dest_coords):
    is_truckacess = False
    is_straightline = True

    length = count_eqlidean_lenght(source_coords, dest_coords)

    return [length, is_truckacess, is_straightline]