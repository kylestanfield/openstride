import { Text, View, StyleSheet } from "react-native";
import RecordingFooter from "@/components/recording/RecordingFooter";
import { LiveRunStats } from "@/components/recording/LiveRunStats";
import * as Location from "expo-location";

type Props = {
  onPauseClick: () => void;
  onStopClick: () => void;
  location: Location.LocationObject | null;
  route: Location.LocationObject[]; // added route array
  isRecording: boolean;
  startTime: number;
};

export default function RunInfo({
  onPauseClick,
  onStopClick,
  location,
  route,
  isRecording,
  startTime,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Go Get 'Em Tiger!</Text>

      {location && (
        <Text style={styles.text}>
          Your location: {location.coords.latitude.toFixed(5)},{" "}
          {location.coords.longitude.toFixed(5)}
        </Text>
      )}

      {/* Live stats while recording */}
      {isRecording && route.length > 1 && (
        <LiveRunStats
          route={route}
          startTime={startTime}
        />
      )}

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
