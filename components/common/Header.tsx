import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <FontAwesome6
        name="person-running"
        size={32}
        color="white"
        style={styles.headerIcon}
      />
      <Text style={styles.titleText}>OpenStride</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",

    backgroundColor: "#1E2226",

    marginLeft: 8,
    marginTop: 20,
    marginRight: 8,
    marginBottom: 0,

    paddingTop: 40,
    paddingBottom: 3,

    borderBottomColor: "#8e99a5ff",
    borderBottomWidth: 1,

    display: "flex",
    flexDirection: "row",
  },
  headerIcon: {
    paddingLeft: 15,
  },
  titleText: {
    color: "#fff",
    width: "100%",
    fontSize: 32,

    marginLeft: 15,
  },
});
