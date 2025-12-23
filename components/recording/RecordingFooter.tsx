import { useTheme } from "@/context/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, StyleSheet, Pressable } from "react-native";

type Props = {
  onPauseClick: () => void;
  onResumeClick: () => void;
  onStopClick: () => void;
  isPaused: boolean;
};

export default function RecordingFooter({
  onPauseClick,
  onResumeClick,
  onStopClick,
  isPaused,
}: Props) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    footer: {
      width: "90%", // Ensures the footer spans the container
      height: "15%", // Give it a fixed height for touch targets

      backgroundColor: theme.colors.surface,

      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",

      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.05,
      shadowRadius: theme.radii.sm,

      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radii.sm, // Optional: rounded corners looks nice for control bars
    },
    pressable: {
      height: "100%",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    icons: {
      padding: theme.spacing[2],
    },
    divider: {
      width: 1,
      height: "80%", // Don't let divider touch the very edges
      backgroundColor: theme.colors.border,
    },
  });

  return (
    <View style={styles.footer}>
      {!isPaused ? (
        <Pressable
          onPress={onPauseClick}
          style={styles.pressable}
        >
          <Ionicons
            name="pause-sharp"
            size={32}
            color={theme.colors.accent[500]}
            style={styles.icons}
          />
        </Pressable>
      ) : (
        <Pressable
          onPress={onResumeClick}
          style={styles.pressable}
        >
          <Ionicons
            name="play-sharp"
            size={32}
            color={theme.colors.accent[500]}
            style={styles.icons}
          />
        </Pressable>
      )}

      <View style={styles.divider} />

      <Pressable
        onPress={onStopClick}
        style={styles.pressable}
      >
        <Ionicons
          name="stop-sharp"
          size={32}
          color={theme.colors.accent[500]}
          style={styles.icons}
        />
      </Pressable>
    </View>
  );
}
