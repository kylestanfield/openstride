// components/LiveRunStats.tsx
import formatElapsedTime from "@/utils/TimeUtils";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type LiveRunStatsProps = {
  distanceKm: number;
  elapsedTime: number;
  paceSeconds: number;
};

export default function LiveRunStats({
  distanceKm,
  elapsedTime,
  paceSeconds,
}: LiveRunStatsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.stat}>
        Distance: {distanceKm.toFixed(1)} Km
      </Text>
      <Text style={styles.stat}>
        Time: {formatElapsedTime(Math.floor(elapsedTime))}
      </Text>
      <Text style={styles.stat}>
        Pace: {formatElapsedTime(Math.floor(paceSeconds))} per Km
      </Text>
    </View>
  );
}

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
