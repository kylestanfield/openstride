import { gpxToRoute } from "./utils/GpxToRoute.ts";
import { computeTotalDistance } from "./utils/RouteUtils.ts";

const testRoute = gpxToRoute("./test.gpx", 10 * 60 * 1000);

const distanceMeters = computeTotalDistance(testRoute);
console.log("Distance (km):", (distanceMeters / 1000).toFixed(2));
