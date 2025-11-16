import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View, StyleSheet, Pressable } from "react-native";

type Props = {
  onPauseClick: () => void;
  onStopClick: () => void;
};

export default function RecordingFooter({
  onPauseClick,
  onStopClick,
}: Props) {
  return (
    <View style={styles.footer}>
      <Pressable onPress={onPauseClick}>
        <Ionicons
          style={styles.buttons}
          name="pause-sharp"
          size={32}
          color="#fff"
        ></Ionicons>
      </Pressable>

      <View style={styles.divider} />

      <Pressable onPress={onStopClick}>
        <Ionicons
          style={styles.buttons}
          name="stop-sharp"
          size={32}
          color="#fff"
        ></Ionicons>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderWidth: 1,
    borderColor: "#9392bdff",
  },
  buttons: {
    // borderWidth: 1,
    // borderColor: "#fff",
  },
  divider: {
    width: 1,
    height: "100%",
    backgroundColor: "#9392bdff",
  },
});
