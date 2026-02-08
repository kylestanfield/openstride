import Header from "@/components/common/Header";
import StatsPage from "@/components/stats/StatsPage";
import { StyleSheet, View } from "react-native";

export default function Stats() {
  return (
    <View>
      <Header />
      <StatsPage></StatsPage>
    </View>
  );
}
