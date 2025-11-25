import { gpxToRoute } from "../utils/GpxToRoute";
import { computeTotalDistance } from "../utils/RouteUtils";
import { getPreciseDistance } from "geolib";
const fs = jest.requireActual("fs");

describe("gpx utilities", () => {
  test("should calculate the correct haversine distance", () => {
    const p1 = { latitude: 34.052235, longitude: -118.243683 };
    const p2 = { latitude: 34.052245, longitude: -118.243783 };
    const distance = getPreciseDistance(p1, p2);
    expect(parseFloat(distance.toFixed(2))).toBeCloseTo(9, 2);
  });

  test("should calculate the distance of a real run", () => {
    const gpxContent = fs.readFileSync(
      "tests/gpxTestData/4.24.gpx",
      "utf8",
    );
    const route = gpxToRoute(gpxContent);
    const distance = computeTotalDistance(route);
    expect(distance / 1609.34).toBeCloseTo(4.24, 2);
  });
});
