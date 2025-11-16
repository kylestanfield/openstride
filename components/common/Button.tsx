import Ionicons from "@expo/vector-icons/Ionicons";
import { ComponentProps } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type IoniconsProps = ComponentProps<typeof Ionicons>;
type IconName = IoniconsProps["name"];

type Props = {
  label: string;
  theme?: "primary";
  iconName?: IconName;
  iconSize?: number;
  iconColor?: string;
  clickFunction?: () => void;
};

export default function Button({
  label,
  theme,
  iconName,
  iconSize,
  iconColor,
  clickFunction,
}: Props) {
  if (theme === "primary") {
    return (
      <View style={[styles.buttonContainer, { marginTop: 20 }]}>
        <Pressable
          style={styles.button}
          onPress={clickFunction}
        >
          {iconName ? (
            <Ionicons
              name={iconName}
              size={iconSize}
              color={iconColor}
              style={{
                textShadowColor: "#C45255", // Match the icon color
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 3, // Adjust for glow intensity
              }}
            />
          ) : null}
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
  buttonIcon: {
    color: "#fff",
    fontSize: 16,
  },
});
