import { Text, View, StyleSheet } from "react-native";
import RecordingFooter from "@/components/recording/RecordingFooter";
import * as Location from "expo-location";

type Props = {
  onPauseClick: () => void;
  onStopClick: () => void;
  location: Location.LocationObject | null;
};

export default function RunInfo({
  onPauseClick,
  onStopClick,
  location,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Go Get 'Em Tiger!</Text>
      {location ? (
        <Text style={styles.text}>
          Your location is {JSON.stringify(location)}
        </Text>
      ) : null}

      <RecordingFooter
        onPauseClick={onPauseClick}
        onStopClick={onStopClick}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    color: "#fff",
    marginTop: 20,
    fontSize: 24,
  },
});
