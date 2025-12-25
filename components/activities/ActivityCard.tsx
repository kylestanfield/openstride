import { useTheme } from "@/hooks/useTheme";
import { PersistedRoute } from "@/types";
import formatElapsedTime from "@/utils/TimeUtils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, StyleSheet, Text } from "react-native";

interface Props {
  route: PersistedRoute;
}

export default function ActivityCard({ route }: Props) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    card: {
      width: "100%",
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
      paddingVertical: theme.spacing[4],
      rowGap: theme.spacing[4],
    },

    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: theme.spacing[2],
    },

    column: {
      flex: 1,
      alignItems: "center",
    },

    ActivityTitle: {
      color: theme.colors.text.primary,
      fontSize: theme.typography.size.md,
    },

    date: {
      color: theme.colors.text.secondary,
      fontSize: theme.typography.size.sm,
    },

    iconpair: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing[1],
    },

    distance: {
      color: theme.colors.text.secondary,
      fontSize: theme.typography.size.sm,
    },

    time: {
      color: theme.colors.text.secondary,
      fontSize: theme.typography.size.sm,
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.ActivityTitle}>Afternoon Run</Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.date}>
            {new Date(route.start_time).toDateString()}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <View style={styles.iconpair}>
            <Ionicons
              name="walk-outline"
              size={18}
              color={theme.colors.primary[500]}
            />
            <Text style={styles.distance}>
              {(route.distance / 1000).toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.iconpair}>
            <Ionicons
              name="time-outline"
              size={18}
              color={theme.colors.primary[500]}
            />
            <Text style={styles.time}>
              {formatElapsedTime(Math.floor(route.duration / 1000))}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
