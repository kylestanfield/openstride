import { Text, View, StyleSheet } from "react-native";
import RecordingFooter from "@/components/recording/RecordingFooter";
import LiveRunStats, {
  LiveRunStatsProps,
} from "@/components/recording/LiveRunStats";
import { useTheme } from "@/context/ThemeContext";

type Props = {
  liveRunStats: LiveRunStatsProps;
  onPauseClick: () => void;
  onStopClick: () => void;
};

export default function RunInfo({
  liveRunStats,
  onPauseClick,
  onStopClick,
}: Props) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: "85%",

      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",

      paddingHorizontal: theme.spacing[4],
      backgroundColor: theme.colors.background,
    },

    text: {
      color: theme.colors.text.primary,

      marginTop: theme.spacing[6],
      marginBottom: theme.spacing[4],

      paddingTop: theme.spacing[4],

      fontSize: theme.typography.size.lg,
      fontWeight: "500",
    },
    flavorText: {
      color: theme.colors.text.secondary,
      fontSize: theme.typography.size.md,
      fontWeight: "400",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recording Started</Text>

      {/* Live stats while recording */}
      <LiveRunStats {...liveRunStats} />

      <RecordingFooter
        onPauseClick={onPauseClick}
        onStopClick={onStopClick}
      />
    </View>
  );
}
