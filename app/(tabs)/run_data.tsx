import Header from "@/components/common/Header";
import { StyleSheet, Text, View } from "react-native";

export default function RunData() {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.text}>Previous runs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center", // align items on the cross axis
    flexDirection: "column",
  },
  text: {
    color: "#fff",
    marginTop: 50,
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
