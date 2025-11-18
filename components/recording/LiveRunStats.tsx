// components/LiveRunStats.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type LiveRunStatsProps = {
  distanceKm: number;
  elapsedMinutes: number;
  elapsedSeconds: number;
  paceMinutes: number;
  paceSeconds: number;
};

export default function LiveRunStats({
  distanceKm,
  elapsedMinutes,
  elapsedSeconds,
  paceMinutes,
  paceSeconds,
}: LiveRunStatsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.stat}>Distance: {distanceKm} Kilometers</Text>
      <Text style={styles.stat}>
        Time: {elapsedMinutes}:{elapsedSeconds}
      </Text>
      <Text style={styles.stat}>
        Pace: {paceMinutes}:{paceSeconds} Minutes per Kilometers
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
