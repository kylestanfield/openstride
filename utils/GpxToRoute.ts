// utils/gpxToRoute.ts
// NOTE: This file is for testing purposes only and should not be used in the production app.
// It uses the Node.js 'fs' module, which is not available in the React Native environment.
import { XMLParser } from "fast-xml-parser";
import * as Location from "expo-location";
import fs from "fs";

/**
 * Converts a GPX string or file into LocationObject[] for testing.
 * @param gpxInput - GPX XML string or path to GPX file
 * @param rescaleDurationMs - optional, total duration in milliseconds to rescale timestamps
 */
export function gpxToRoute(
  gpxInput: string,
  rescaleDurationMs?: number,
): Location.LocationObject[] {
  // Read from file if input is a file path
  let gpxString = gpxInput;
  if (fs.existsSync(gpxInput)) {
    gpxString = fs.readFileSync(gpxInput, "utf8");
  }

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    parseAttributeValue: true,
  });

  const gpxData = parser.parse(gpxString);

  const trkpts = gpxData.gpx.trk.trkseg.trkpt;

  if (!trkpts || trkpts.length === 0) return [];

  // Convert to LocationObject[]
  const route: Location.LocationObject[] = trkpts.map((pt: any) => ({
    coords: {
      latitude: parseFloat(pt.lat),
      longitude: parseFloat(pt.lon),
      altitude: pt.ele ? parseFloat(pt.ele) : 0,
      accuracy: 5,
      heading: 0,
      speed: 0,
    },
    timestamp: new Date(pt.time).getTime(),
  }));

  // Optionally rescale timestamps
  if (rescaleDurationMs) {
    const startTime = Date.now();
    const interval = rescaleDurationMs / route.length;
    return route.map((pt, i) => ({
      ...pt,
      timestamp: startTime + i * interval,
    }));
  }

  return route;
}
