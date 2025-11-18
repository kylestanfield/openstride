import { useState, useEffect } from "react";
import { useGpsTracking } from "@/hooks/useGpsTracking";

const START_COUNT = 3;

export const useRecording = () => {
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [currentCountdown, setCurrentCountdown] = useState(START_COUNT);

  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingPaused, setIsRecordingPaused] = useState(false);

  // Track the exact time the recording started
  const [recordingStartTime, setRecordingStartTime] = useState<number>(
    Date.now,
  );

  const {
    location,
    errorMsg,
    isTracking,
    route,
    startTracking,
    stopTracking,
  } = useGpsTracking();

  // When user presses 'Start Recording', start countdown
  const onRecordClick = () => {
    setIsRecording(false);
    setIsRecordingPaused(false);
    setIsCountingDown(true);
    setCurrentCountdown(START_COUNT);
  };

  const onPauseClick = () => {
    setIsRecordingPaused(true);
    setIsCountingDown(false);
  };

  const onStopClick = () => {
    setIsRecording(false);
    setIsRecordingPaused(false);
    setIsCountingDown(false);
    setCurrentCountdown(START_COUNT);
    stopTracking();
    setRecordingStartTime(Date.now);
  };

  useEffect(() => {
    if (!isCountingDown) return;

    const timerId = setInterval(() => {
      setCurrentCountdown((prevCount) => {
        const newCount = prevCount - 1;

        if (newCount === 0) {
          clearInterval(timerId);
          setIsRecording(true);
          setIsRecordingPaused(false);
          setIsCountingDown(false);

          // Track the start time **right when recording begins**
          setRecordingStartTime(Date.now());

          startTracking();
          return START_COUNT;
        }

        return newCount;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isCountingDown]);

  return {
    isCountingDown,
    currentCountdown,
    isRecording,
    isRecordingPaused,
    location,
    errorMsg,
    isTracking,
    route,
    recordingStartTime, // ✅ expose startTime
    onRecordClick,
    onPauseClick,
    onStopClick,
  };
};
