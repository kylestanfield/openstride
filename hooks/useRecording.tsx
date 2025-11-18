import { useState, useEffect } from "react";
import { useGpsTracking } from "@/hooks/useGpsTracking";
import { useRouteRepository } from "./useRouteRepository";

import * as Location from "expo-location";
import {
  haversineDistance,
  computeDuration,
  computePace,
} from "@/utils/RouteUtils";

const START_COUNT = 3;

export const useRecording = () => {
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [currentCountdown, setCurrentCountdown] = useState(START_COUNT);

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setisPaused] = useState(false);

  // Track the exact time the recording started
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(
    null,
  );
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [pace, setPace] = useState<number>(0);

  const [currentRunLocationList, setCurrentRunLocationList] = useState<
    Location.LocationObject[]
  >([]);
  const [distance, setDistance] = useState<number>(0);

  const {
    getAllRoutes,
    createRoute,
    getRouteWithPoints,
    deleteRoute,
    saveRouteWithPoints,
  } = useRouteRepository();

  const { location, errorMsg, startTracking, stopTracking } =
    useGpsTracking();

  const handleLocationUpdate = () => {
    if (isRecording && location) {
      setCurrentRunLocationList((prevList) => {
        const updatedList = [...prevList, location];
        if (updatedList.length > 1) {
          let prevPoint = updatedList.at(-2);
          if (prevPoint) {
            setDistance(
              distance +
                haversineDistance(prevPoint.coords, location.coords),
            );
          }
        }
        return updatedList;
      });
    }
  };

  useEffect(handleLocationUpdate, [isRecording, location]);

  // When user presses 'Start Recording', start countdown
  const onRecordClick = () => {
    setIsRecording(false);
    setisPaused(false);
    setCurrentCountdown(START_COUNT);
    setIsCountingDown(true);
  };

  const onPauseClick = () => {
    setisPaused(true);
    setIsCountingDown(false);
  };

  const onStopClick = () => {
    setIsRecording(false);
    setisPaused(false);
    setIsCountingDown(false);
    setCurrentCountdown(START_COUNT);
    stopTracking();
    setRecordingStartTime(null);
  };

  const handleCountdown = () => {
    if (!isCountingDown) return;

    const timerId = setInterval(() => {
      setCurrentCountdown((prevCount) => {
        const newCount = prevCount - 1;

        if (newCount === 0) {
          clearInterval(timerId);
          setIsRecording(true);
          setisPaused(false);
          setIsCountingDown(false);

          setDistance(0);
          setElapsedTime(0);
          setPace(0);
          setRecordingStartTime(Date.now());

          startTracking();
          return START_COUNT;
        }

        return newCount;
      });
    }, 1000); // every 1000 ms, update countdown until it reaches zero

    return () => clearInterval(timerId);
  };
  useEffect(handleCountdown, [isCountingDown]);

  const handleTime = () => {
    if (isRecording && !isPaused) {
      setElapsedTime(computeDuration(recordingStartTime));
    }
  };
  useEffect(handleTime, [isRecording, isPaused, elapsedTime]);

  const handlePace = () => {
    if (distance > 0) {
      setPace(computePace(distance, elapsedTime));
    }
  };
  useEffect(handlePace, [distance, elapsedTime]);

  return {
    isCountingDown,
    currentCountdown,
    isRecording,
    isPaused,
    errorMsg,
    onRecordClick,
    onPauseClick,
    onStopClick,
    distance,
    elapsedTime,
    pace,
  };
};
