import { useTheme } from "@/context/ThemeContext";
import { useActivities } from "@/hooks/useActivities";
import { Text, StyleSheet, View, Animated } from "react-native";
import ActivityList from "./ActivityList";

export default function ActivitiesPage() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "85%",
      backgroundColor: theme.colors.background,
    },
  });

  const { isLoading } = useActivities();

  return (
    <View style={styles.container}>
      <ActivityList />
    </View>
  );
}
