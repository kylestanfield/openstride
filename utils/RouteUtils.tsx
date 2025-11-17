import { Point } from "@/hooks/useRouteRepository";

interface LatLon {
  latitude: number;
  longitude: number;
}

export function computeDuration(points: Point[]): number {
  if (points.length < 2) return 0;
  const start = points[0].timestamp;
  const end = points[points.length - 1].timestamp;
  return end - start; // in milliseconds, convert if needed
}

export function computeDistance(points: Point[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += haversineDistance(points[i - 1], points[i]);
  }
  return total; // in meters
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
