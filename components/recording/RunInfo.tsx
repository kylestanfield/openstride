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
  isRecording: boolean;
};

export default function RunInfo({
  liveRunStats,
  onPauseClick,
  onStopClick,
  isRecording,
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
  });

  return (
    <View style={styles.container}>
      {/* Live stats while recording */}
      <LiveRunStats {...liveRunStats} />
    </View>
  );
}
