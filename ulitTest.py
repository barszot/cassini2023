import unittest
import util


class MyTestCase(unittest.TestCase):
    def test_shortest_path(self):
        source = (11.5874, 43.1448)
        dest = (11.5018, 42.8601)
        self.assertEqual([35.80865400000001, False, False], util.shortest_path(source, dest))
        self.assertEqual([32.514503000000005, True, False], util.truckAccesiblePath(source, dest))
        self.assertEqual([32.407739827112394, False, True], util.euklidesPath(source, dest))

    def test_truck_Accesible(self):
        source = (11.5874, 43.1448)
        dest = (11.5018, 42.8601)
        self.assertEqual([32.514503000000005, True, False], util.truckAccesiblePath(source, dest))

    def test_euklides_Path(self):
        source = (11.5874, 43.1448)
        dest = (11.5018, 42.8601)
        self.assertEqual([32.407739827112394, False, True], util.euklidesPath(source, dest))

if __name__ == '__main__':
    unittest.main()
