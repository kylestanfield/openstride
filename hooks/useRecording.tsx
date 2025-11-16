import { useState, useEffect } from "react";
import { useGpsTracking } from "@/hooks/useGpsTracking";

const START_COUNT = 3;

export const useRecording = () => {
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [currentCountdown, setCurrentCountdown] = useState(START_COUNT);

  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingPaused, setIsRecordingPaused] = useState(false);

  const {
    location,
    errorMsg,
    isTracking,
    route,
    startTracking,
    stopTracking,
  } = useGpsTracking();

  // When user presses 'Start Recording', start a countdown
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
  };

  useEffect(() => {
    if (!isCountingDown) {
      return;
    }
    const timerId = setInterval(() => {
      if (!isCountingDown) {
        return;
      }
      setCurrentCountdown((prevCount) => {
        const newCount = prevCount - 1;

        if (newCount === 0) {
          // Time is up!
          clearInterval(timerId);
          setIsRecording(true);
          setIsRecordingPaused(false);
          setIsCountingDown(false);
          startTracking();
          return START_COUNT;
        }

        return newCount;
      });
    }, 1000); // run every 1000 ms

    return () => {
      clearInterval(timerId);
    };
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
    onRecordClick,
    onPauseClick,
    onStopClick,
  };
};
