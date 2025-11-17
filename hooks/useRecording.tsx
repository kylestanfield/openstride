// This hook handles all the state and transitions used by the Recording component

import { useState, useEffect } from "react";
import {
  convertLocationToPoint,
  useGpsTracking,
} from "@/hooks/useGpsTracking";
import { Point, Route, useRouteRepository } from "./useRouteRepository";
import {
  computeDistance,
  computeDuration,
  computePace,
} from "@/utils/RouteUtils";

const { saveRouteWithPoints } = useRouteRepository();

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

  const onStopClick = async () => {
    // Reset all state for the component back to defaults
    setIsRecording(false);
    setIsRecordingPaused(false);
    setIsCountingDown(false);
    setCurrentCountdown(START_COUNT);
    stopTracking();

    if (route.length == 0) {
      return;
    }
    const points: Point[] = route.map(convertLocationToPoint);

    // Build Route object
    const totalDistance = computeDistance(points); // sum distances between points
    const duration = computeDuration(points); // last timestamp - first timestamp
    const pace = computePace(totalDistance, duration); // optional

    const newRoute: Route = {
      id: 0,
      start_time: points[0].timestamp,
      duration,
      distance: totalDistance,
      pace,
    };

    try {
      await saveRouteWithPoints(newRoute, points);
    } catch (err) {
      console.error("Failed to save run:", err);
    }
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
