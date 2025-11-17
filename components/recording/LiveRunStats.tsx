// components/LiveRunStats.tsx
import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LocationObject } from "expo-location";
import { haversineDistance } from "@/utils/RouteUtils";

interface LiveRunStatsProps {
  route: LocationObject[];
}

export const LiveRunStats: React.FC<LiveRunStatsProps> = ({
  route,
}) => {
  // Compute total distance (meters)
  const distance = useMemo(() => {
    if (route.length < 2) return 0;
    let total = 0;
    for (let i = 1; i < route.length; i++) {
      total += haversineDistance(
        {
          latitude: route[i - 1].coords.latitude,
          longitude: route[i - 1].coords.longitude,
        },
        {
          latitude: route[i].coords.latitude,
          longitude: route[i].coords.longitude,
        },
      );
    }
    return total;
  }, [route]);

  // Compute duration (ms)
  const duration = useMemo(() => {
    if (route.length < 2) return 0;
    return route[route.length - 1].timestamp - route[0].timestamp;
  }, [route]);

  // Compute pace (seconds per km)
  const pace = useMemo(() => {
    if (distance === 0) return 0;
    const durationSec = duration / 1000;
    const distanceKm = distance / 1000;
    return durationSec / distanceKm; // seconds per km
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
