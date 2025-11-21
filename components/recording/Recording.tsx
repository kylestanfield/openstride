import React, { useMemo } from "react";
import { Text, View, StyleSheet } from "react-native";
import Button from "@/components/common/Button";
import Countdown from "@/components/recording/Countdown";
import RunInfo from "@/components/recording/RunInfo";
import { useRecording } from "@/hooks/useRecording";
import { useTheme } from "@/context/ThemeContext";
import RecordingFooter from "./RecordingFooter";

export default function Recording() {
  const { theme } = useTheme();

  const {
    isCountingDown,
    currentCountdown,
    isRecording,
    isPaused,
    errorMsg,
    distance,
    elapsedTime,
    pace,
    onRecordClick,
    onPauseClick,
    onStopClick,
  } = useRecording();

  const liveRunStats = useMemo(
    () => ({
      distanceKm: distance / 1000,
      elapsedTime: elapsedTime / 1000,
      paceSeconds: pace,
    }),
    [distance, elapsedTime, pace],
  );

  const styles = StyleSheet.create({
    recordingView: {
      width: "100%",
      height: "100%",

      display: "flex",
      alignSelf: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },

    stateContainer: {
      width: "100%",

      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
    },

    startBtnContainer: {
      marginBottom: theme.spacing[6],
    },

    text: {
      color: theme.colors.text.primary,
      marginTop: theme.spacing[8],
      marginBottom: theme.spacing[8],
      fontSize: theme.typography.size["xl"],
    },
  });

  return (
    <View style={styles.recordingView}>
      {isRecording ? (
        <Text style={styles.text}>Recording Started</Text>
      ) : isCountingDown ? (
        <Text style={styles.text}>Starting</Text>
      ) : (
        <Text style={styles.text}>Press Below To Start Recording</Text>
      )}
      <RunInfo
        liveRunStats={liveRunStats}
        onPauseClick={onPauseClick}
        onStopClick={onStopClick}
        isRecording={isRecording}
      />
      {isCountingDown && (
        <Countdown
          count={currentCountdown}
          onPauseClick={onPauseClick}
          onStopClick={onStopClick}
        />
      )}
      {isRecording ? (
        <RecordingFooter
          onPauseClick={onPauseClick}
          onStopClick={onStopClick}
        />
      ) : (
        !isCountingDown && (
          // Wrapped this in a container to match Countdown/RunInfo structure
          <View style={styles.stateContainer}>
            <View style={styles.startBtnContainer}>
              <Button
                label=""
                theme="primary"
                iconName="radio-button-on-sharp"
                iconSize={100}
                iconColor={theme.colors.accent[700]}
                clickFunction={onRecordClick}
              />
            </View>
          </View>
        )
      )}
    </View>
  );
}
