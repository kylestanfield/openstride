import { Text, View, StyleSheet } from "react-native";
import RecordingFooter from "@/components/recording/RecordingFooter";
import LiveRunStats, {
  LiveRunStatsProps,
} from "@/components/recording/LiveRunStats";

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
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Go Get 'Em Tiger!</Text>

      {/* Live stats while recording */}
      <LiveRunStats {...liveRunStats} />

      <RecordingFooter
        onPauseClick={onPauseClick}
        onStopClick={onStopClick}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  text: {
    color: "#fff",
    marginTop: 20,
    fontSize: 24,
  },
});
