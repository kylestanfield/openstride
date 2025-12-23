import { Point } from "../types";
import { LocationObject } from "expo-location";
import { getPreciseDistance } from "geolib";

interface LatLon {
  latitude: number;
  longitude: number;
}

export function toLatLon(p: {
  coords?: { latitude: number; longitude: number };
  latitude?: number;
  longitude?: number;
}): LatLon {
  if (p.coords)
    return {
      latitude: p.coords.latitude,
      longitude: p.coords.longitude,
    };
  if (p.latitude !== undefined && p.longitude !== undefined)
    return { latitude: p.latitude, longitude: p.longitude };
  throw new Error("Invalid point");
}

export function applyWeightedMovingAverage(
  route: LocationObject[],
  windowSize = 3,
  weights: number[] = [0.2, 0.3, 0.5], // Example weights for windowSize = 3
): LocationObject[] {
  if (windowSize < 2 || route.length < windowSize) return route;
  if (weights.length !== windowSize) {
    console.warn(
      "Weights array length must match windowSize. Using default equal weights.",
    );
    weights = Array(windowSize).fill(1 / windowSize);
  }

  const smoothedRoute: LocationObject[] = [];
  for (let i = 0; i < route.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const end = i + 1;
    const window = route.slice(start, end);

    if (window.length < windowSize) {
      smoothedRoute.push(route[i]); // Not enough points for full window, keep original
      continue;
    }

    let weightedLatSum = 0;
    let weightedLonSum = 0;
    let weightSum = 0;

    for (let j = 0; j < window.length; j++) {
      const weight = weights[j];
      weightedLatSum += (window[j].coords.latitude || 0) * weight;
      weightedLonSum += (window[j].coords.longitude || 0) * weight;
      weightSum += weight;
    }

    smoothedRoute.push({
      ...route[i],
      coords: {
        ...route[i].coords,
        latitude: weightedLatSum / weightSum,
        longitude: weightedLonSum / weightSum,
      },
    });
  }
  return smoothedRoute;
}

export function computePace(
  distanceMeters: number,
  durationMs: number,
): number {
  const distanceKm = distanceMeters;
  const durationSeconds = durationMs;
  if (distanceKm === 0) return 0;
  return durationSeconds / distanceKm; // sec/km
}

export function computeTotalDistance(
  route: Array<Point | LocationObject>,
): number {
  if (route.length < 2) return 0;
  const smoothedRoute = applyWeightedMovingAverage(
    route as LocationObject[],
    3,
    [0.2, 0.3, 0.5],
  );
  let total = 0;
  for (let i = 1; i < smoothedRoute.length; i++) {
    const p1 = toLatLon(smoothedRoute[i - 1]);
    const p2 = toLatLon(smoothedRoute[i]);
    const horizontalDistance = getPreciseDistance(p1, p2);
    const verticalDistance = Math.abs(
      (smoothedRoute[i - 1].coords?.altitude ?? 0) -
        (smoothedRoute[i].coords?.altitude ?? 0),
    );
    total += Math.sqrt(horizontalDistance ** 2 + verticalDistance ** 2);
  }
  return total;
}
