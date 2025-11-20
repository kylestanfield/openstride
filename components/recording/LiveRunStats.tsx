import { useTheme } from "@/context/ThemeContext";
import formatElapsedTime from "@/utils/TimeUtils";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: "100%",

      padding: theme.spacing[6],

      backgroundColor: theme.colors.surface,

      borderRadius: theme.radii.lg,

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.1,
      shadowRadius: theme.radii.xl,
      elevation: 3,

      margin: theme.spacing[4],
      marginBottom: theme.spacing[8],
    },

    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: theme.spacing[4], // Controls spacing between cells
      rowGap: theme.spacing[8],
    },

    cell: {
      width: "45%", // Forces exactly 2 columns
    },

    labelRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing[2],
    },

    icon: {
      marginRight: theme.spacing[2],
    },

    label: {
      alignSelf: "baseline",
      fontSize: theme.typography.size.md,
      color: theme.colors.text.secondary,
    },

    value: {
      fontSize: theme.typography.size.lg,
      fontWeight: "400",
      color: theme.colors.text.primary,
      paddingLeft: theme.spacing[1],
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {/* Distance */}
        <View style={styles.cell}>
          <View style={styles.labelRow}>
            <Ionicons
              name="walk-outline"
              size={18}
              color={theme.colors.primary[500]}
              style={styles.icon}
            />
            <Text style={styles.label}>Distance</Text>
          </View>
          <Text style={styles.value}>{distanceKm.toFixed(2)} km</Text>
        </View>

        {/* Time */}
        <View style={styles.cell}>
          <View style={styles.labelRow}>
            <Ionicons
              name="time-outline"
              size={18}
              color={theme.colors.primary[500]}
              style={styles.icon}
            />
            <Text style={styles.label}>Time</Text>
          </View>
          <Text style={styles.value}>
            {formatElapsedTime(Math.floor(elapsedTime))}
          </Text>
        </View>

        {/* Pace */}
        <View style={styles.cell}>
          <View style={styles.labelRow}>
            <Ionicons
              name="speedometer-outline"
              size={18}
              color={theme.colors.primary[500]}
              style={styles.icon}
            />
            <Text style={styles.label}>Pace</Text>
          </View>
          <Text style={styles.value}>
            {formatElapsedTime(Math.floor(paceSeconds))}/km
          </Text>
        </View>

        {/* Elevation */}
        <View style={styles.cell}>
          <View style={styles.labelRow}>
            <Ionicons
              name="trending-up-outline"
              size={20}
              color={theme.colors.primary[500]}
              style={styles.icon}
            />
            <Text style={styles.label}>Elevation</Text>
          </View>
          <Text style={styles.value}>—</Text>
        </View>
      </View>
    </View>
  );
}
