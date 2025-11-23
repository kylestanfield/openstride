import { gpxToRoute } from "../utils/GpxToRoute";
import { computeTotalDistance } from "../utils/RouteUtils";
import { getPreciseDistance } from "geolib";
const fs = jest.requireActual("fs");

describe("gpx utilities", () => {
  it("should parse a GPX file and compute the total distance", () => {
    const mockGpxContent = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Test" xmlns="http://www.topografix.com/GPX/1/1">
  <trk>
    <trkseg>
      <trkpt lat="34.052235" lon="-118.243683">
        <ele>70.0</ele>
        <time>2025-11-21T23:00:00Z</time>
      </trkpt>
      <trkpt lat="34.052245" lon="-118.243783">
        <ele>71.0</ele>
        <time>2025-11-21T23:00:05Z</time>
      </trkpt>
      <trkpt lat="34.052255" lon="-118.243883">
        <ele>72.0</ele>
        <time>2025-11-21T23:00:10Z</time>
      </trkpt>
    </trkseg>
  </trk>
</gpx>`;

    const testRoute = gpxToRoute(mockGpxContent);
    const distanceMeters = computeTotalDistance(testRoute);

    expect(distanceMeters).toBeCloseTo(12.2, 1);
  });

  it("should calculate the correct haversine distance", () => {
    const p1 = { latitude: 34.052235, longitude: -118.243683 };
    const p2 = { latitude: 34.052245, longitude: -118.243783 };
    const distance = getPreciseDistance(p1, p2);
    expect(parseFloat(distance.toFixed(2))).toBeCloseTo(9, 2);
  });

  it("should calculate the distance of a real run", () => {
    const gpxContent = fs.readFileSync("./tests/Afternoon_Run.gpx", "utf8");
    const route = gpxToRoute(gpxContent);
    const distance = computeTotalDistance(route);
    expect(distance / 1609.34).toBeCloseTo(4.24, 2);
  });
});