import { Text, StyleSheet, View } from "react-native";
import RecordingFooter from "@/components/recording/RecordingFooter";

type CountdownProps = {
  count: number;
  onPauseClick: () => void;
  onStopClick: () => void;
};

export default function Countdown({
  count,
  onPauseClick,
  onStopClick,
}: CountdownProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Starting</Text>
      <Text style={styles.countdownText}>{count}</Text>
      <RecordingFooter
        onPauseClick={onPauseClick}
        onStopClick={onStopClick}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  countdownText: {
    color: "#fff",
    fontSize: 48,
  },
  text: {
    color: "#fff",
    marginTop: 20,
    fontSize: 24,
  },
});
