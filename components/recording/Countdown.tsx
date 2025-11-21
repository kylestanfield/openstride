import { Text, StyleSheet, View, Animated } from "react-native";
import RecordingFooter from "@/components/recording/RecordingFooter";
import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";

type CountdownProps = {
  count: number;
  onPauseClick: () => void;
  onStopClick: () => void;
};

export default function Countdown({
  count,
  onPauseClick,
  onStopClick,
}: CountdownProps) {
  const { theme } = useTheme();

  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Reset values
    scaleAnim.setValue(0.5);
    opacityAnim.setValue(0);

    // Run animation every time 'count' changes
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [count]);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    countdownText: {
      color: theme.colors.text.primary,
      fontSize: theme.typography.size["3xl"],
      fontWeight: "bold",
    },
    text: {
      color: theme.colors.text.secondary,
      marginTop: theme.spacing[6],
      fontSize: theme.typography.size["md"],
    },
  });

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.countdownText,
          { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
        ]}
      >
        {count}
      </Animated.Text>
      {/* Wrap footer to ensure width consistency */}
    </View>
  );
}
