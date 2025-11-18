// utils/types.ts
export interface Point {
  id?: number; // optional if not persisted yet
  routeId?: number; // optional if not persisted yet
  timestamp: number;
  latitude: number;
  longitude: number;
}

export interface LocationPoint {
  latitude: number;
  longitude: number;
  timestamp: number;
  altitude?: number;
}
