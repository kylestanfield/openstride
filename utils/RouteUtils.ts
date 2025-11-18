import { Point } from "../types";
import { LocationObject } from "expo-location";

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

export function computeDuration(startTime: number | null): number {
  return startTime ? Date.now() - startTime : 0;
}

export function computeTotalDistance(
  route: Array<Point | LocationObject>,
): number {
  if (route.length < 2) return 0;
  let total = 0;
  for (let i = 1; i < route.length; i++) {
    total += haversineDistance(
      toLatLon(route[i - 1]),
      toLatLon(route[i]),
    );
  }
  return total;
}

// Helper for distance between two points
export function haversineDistance(p1: LatLon, p2: LatLon): number {
  const R = 6371000; // radius of Earth in meters
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(p2.latitude - p1.latitude);
  const dLon = toRad(p2.longitude - p1.longitude);

  const lat1 = toRad(p1.latitude);
  const lat2 = toRad(p2.latitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // meters
}

export function computePace(
  distanceMeters: number,
  durationMs: number,
): number {
  const distanceKm = distanceMeters / 1000;
  const durationMinutes = durationMs / (1000 * 60);
  if (distanceKm === 0) return 0;
  return durationMinutes / distanceKm; // min/km
}
