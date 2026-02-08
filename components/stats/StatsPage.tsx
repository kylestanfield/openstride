import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import MultiGraph from "./MultiGraph";
import TabSelectorAnimation, {
  TabItem,
} from "/home/kyle/openstride/components/common/Selector"; // Ensure correct import path
import { View, Text, StyleSheet } from "react-native";

export default function StatsPage() {
  const { theme } = useTheme();
  const [indexTab, setIndexTab] = useState(0);

  const DATA: TabItem[] = [
    { title: "Tab1" },
    { title: "Tab2" },
    { title: "Tab3" },
  ];

  const styles = StyleSheet.create({
    statspagecontainer: {
      width: "100%",
      height: "100%",
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing[4],
    },
    wrapperAll: {
      justifyContent: "center",
      marginTop: theme.spacing[4],
      width: "100%",
      alignItems: "center",
    },
    tabSelector: {
      width: "100%",
    },
    statusText: {
      marginTop: 20,
      fontSize: 16,
      // FIX 1: Access the specific string value, not the whole object
      color: theme.colors.text.primary,
      textAlign: "center",
    },
  });

  return (
    <View style={styles.statspagecontainer}>
      <View style={styles.wrapperAll}>
        <TabSelectorAnimation
          onChangeTab={setIndexTab}
          style={styles.tabSelector}
          tabs={DATA}
          // FIX 2 & 3: Use properties that actually exist on your theme
          backgroundColor={theme.colors.surface}
          activeColor={theme.colors.primary[500]} // Access specific shade
          textColor={theme.colors.text.primary}
        />

        <Text style={styles.statusText}>
          {`Current tab is ${indexTab + 1}: ${DATA[indexTab].title}`}
        </Text>
      </View>

      {/* FIX 4: Removed 'activeTab={indexTab}' because MultiGraph 
          does not accept props yet. Update MultiGraph to accept 
          props if you need to pass this data. */}
      <MultiGraph />
    </View>
  );
}
