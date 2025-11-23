import { useTheme } from "@/context/ThemeContext";
import formatElapsedTime from "@/utils/TimeUtils";
import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type LiveRunStatsProps = {
  distanceKm: number;
  elapsedTime: number;
  paceSeconds: number;
};

const createStyles = (theme: any) =>
  StyleSheet.create({
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
      justifyContent: "space-between",
      rowGap: theme.spacing[8],
    },

    cell: {
      flexBasis: "48%", // Perfect 2 columns
    },

    labelRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start", // <— prevents shifting due to label width
      marginBottom: theme.spacing[1],
    },

    icon: {
      marginRight: theme.spacing[2],
    },

    label: {
      fontSize: theme.typography.size.md,
      color: theme.colors.text.secondary,
    },

    value: {
      fontSize: theme.typography.size.md,
      color: theme.colors.text.primary,
      textAlign: "left", // Common in fitness dashboards
      paddingLeft: theme.spacing[7],
    },
  });

const LiveRunStats = React.memo(
  ({ distanceKm, elapsedTime, paceSeconds }: LiveRunStatsProps) => {
    const { theme } = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);

    return (
      <View style={styles.container}>
        <View style={styles.grid}>
          {/* Distance */}
          <View style={styles.cell}>
            <View style={styles.labelRow}>
              <Ionicons
                name="walk-outline"
                size={20}
                color={theme.colors.primary[500]}
                style={styles.icon}
              />
              <Text style={styles.label}>Distance</Text>
            </View>
            <Text style={styles.value}>{distanceKm.toFixed(1)} km</Text>
          </View>

          {/* Time */}
          <View style={styles.cell}>
            <View style={styles.labelRow}>
              <Ionicons
                name="time-outline"
                size={20}
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
                size={20}
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
  },
);

export default LiveRunStats;
