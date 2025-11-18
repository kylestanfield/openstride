// components/LiveRunStats.tsx
import React, { useEffect, useState, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LocationObject } from "expo-location";
import { haversineDistance } from "@/utils/RouteUtils";

interface LiveRunStatsProps {
  route: LocationObject[];
  startTime: number; // recording start timestamp
}

// Normalize LocationObject or Point
function toLatLon(p: {
  coords?: { latitude: number; longitude: number };
  latitude?: number;
  longitude?: number;
}) {
  if (p.coords)
    return {
      latitude: p.coords.latitude,
      longitude: p.coords.longitude,
    };
  if (p.latitude !== undefined && p.longitude !== undefined)
    return { latitude: p.latitude, longitude: p.longitude };
  throw new Error("Invalid point");
}

// Smooth route with moving average
function smoothRoute(
  route: LocationObject[],
  window = 3,
): LocationObject[] {
  if (route.length < 2) return route;
  const smoothed: LocationObject[] = [];
  for (let i = 0; i < route.length; i++) {
    const start = Math.max(0, i - Math.floor(window / 2));
    const end = Math.min(route.length - 1, i + Math.floor(window / 2));
    let latSum = 0,
      lonSum = 0,
      count = 0;
    for (let j = start; j <= end; j++) {
      latSum += route[j].coords.latitude;
      lonSum += route[j].coords.longitude;
      count++;
    }
    smoothed.push({
      ...route[i],
      coords: {
        ...route[i].coords,
        latitude: latSum / count,
        longitude: lonSum / count,
      },
    });
  }
  return smoothed;
}

// Compute total distance with optional noise filtering
function computeTotalDistance(
  route: LocationObject[],
  minDistance = 3,
): number {
  if (route.length < 2) return 0;
  let total = 0;
  for (let i = 1; i < route.length; i++) {
    const dist = haversineDistance(
      toLatLon(route[i - 1]),
      toLatLon(route[i]),
    );
    if (dist >= minDistance) {
      total += dist;
    }
  }
  return total;
}

export const LiveRunStats: React.FC<LiveRunStatsProps> = ({
  route,
  startTime,
}) => {
  const [now, setNow] = useState(Date.now());

  // Update 'now' every second
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Smooth route first
  const smoothedRoute = useMemo(() => smoothRoute(route), [route]);

  // Compute distance (meters)
  const distance = useMemo(
    () => computeTotalDistance(smoothedRoute),
    [smoothedRoute],
  );

  // Compute duration (ms)
  const duration = useMemo(
    () => Math.max(0, now - startTime),
    [now, startTime],
  );

  // Compute pace (seconds per km)
  const pace = useMemo(() => {
    if (distance === 0) return 0;
    const distanceKm = distance / 1000;
    const durationSec = duration / 1000;
    return durationSec / distanceKm;
  }, [distance, duration]);

  // Format duration
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000)
    .toString()
    .padStart(2, "0");

  // Format pace
  const paceMin = Math.floor(pace / 60);
  const paceSec = Math.floor(pace % 60)
    .toString()
    .padStart(2, "0");

  return (
    <View style={styles.container}>
      <Text style={styles.stat}>
        Distance: {(distance / 1000).toFixed(2)} km
      </Text>
      <Text style={styles.stat}>
        Time: {minutes}:{seconds}
      </Text>
      <Text style={styles.stat}>
        Pace: {paceMin}:{paceSec} min/km
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    margin: 16,
  },
  stat: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 4,
  },
});
