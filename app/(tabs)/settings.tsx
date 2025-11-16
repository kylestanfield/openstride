import Header from "@/components/Header";
import { StyleSheet, View } from "react-native";

export default function Settings() {
  return (
    <View style={styles.container}>
      <Header />
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
    marginTop: 20,
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
