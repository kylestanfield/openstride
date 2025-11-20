import { useTheme } from "@/context/ThemeContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    headerContainer: {
      width: "100%",

      backgroundColor: theme.colors.surface,

      paddingTop: theme.spacing[16],
      paddingBottom: theme.spacing[1],

      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,

      display: "flex",
      flexDirection: "row",
    },
    headerIcon: {
      paddingTop: theme.spacing[2],
      paddingLeft: theme.spacing[4],
    },

    titleText: {
      color: theme.colors.text.primary,
      fontSize: theme.typography.size["3xl"],

      marginLeft: theme.spacing[4],
    },
  });

  return (
    <View style={styles.headerContainer}>
      <FontAwesome6
        name="person-running"
        size={32}
        color={theme.colors.primary[500]}
        style={styles.headerIcon}
      />
      <Text style={styles.titleText}>OpenStride</Text>
    </View>
  );
}
