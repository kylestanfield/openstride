import Header from "@/components/common/Header";
import Recording from "@/components/recording/Recording";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Header />
      <Recording />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",

    flex: 1,
    flexDirection: "column",
    alignItems: "center", // align items on the cross axis

    backgroundColor: "#25292e",
  },
  text: {
    color: "#fff",
    marginTop: 20,
    fontSize: 24,
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
