import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Button from "@/components/common/Button";
import Countdown from "@/components/recording/Countdown";
import RunInfo from "@/components/recording/RunInfo";
import { useRecording } from "@/hooks/useRecording";

export default function Recording() {
  const {
    isRecording,
    isCountingDown,
    currentCountdown,
    location,
    errorMsg,
    isTracking,
    route,
    onRecordClick,
    onPauseClick,
    onStopClick,
  } = useRecording();

  return (
    <View style={styles.recordingView}>
      {isRecording ? (
        <>
          <RunInfo
            onPauseClick={onPauseClick}
            onStopClick={onStopClick}
            location={location}
          ></RunInfo>
        </>
      ) : isCountingDown ? (
        <>
          <Countdown
            count={currentCountdown}
            onPauseClick={onPauseClick}
            onStopClick={onStopClick}
          />
        </>
      ) : (
        <>
          <Text style={styles.text}>Start Recording</Text>
          <Button
            label=""
            theme="primary"
            iconName="radio-button-on-sharp"
            iconSize={100}
            iconColor="#e93a40ff"
            clickFunction={onRecordClick}
          ></Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  recordingView: {
    width: "65%",
    height: "60%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  text: {
    color: "#fff",
    marginTop: 20,
    fontSize: 24,
  },
});
