import { useState, useEffect } from "react";
import { useGpsTracking } from "@/hooks/useGpsTracking";
import { useRouteRepository } from "./useRouteRepository";

import * as Location from "expo-location";
import { computePace } from "@/utils/RouteUtils";
import { Route } from "@/types";
import { useRoutes } from "@/context/RouteContext";

const START_COUNT = 3;

export const useRecording = () => {
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [currentCountdown, setCurrentCountdown] = useState(START_COUNT);

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setisPaused] = useState(false);

  // Track the exact time the recording started
  const [recordingStartTime, setRecordingStartTime] =
    useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0); // units: ms
  const [pace, setPace] = useState<number>(0); // units: sec/km

  const [currentRunLocationList, setCurrentRunLocationList] = useState<
    Location.LocationObject[]
  >([]);
  const [distance, setDistance] = useState<number>(0); // units: meters

  const resetAllState = () => {
    setIsCountingDown(false);
    setCurrentCountdown(START_COUNT);
    setIsRecording(false);
    setisPaused(false);
    setRecordingStartTime(0);
    setElapsedTime(0);
    setPace(0);
    setCurrentRunLocationList([]);
    setDistance(0);
  };

  const { location, errorMsg, startTracking, stopTracking } =
    useGpsTracking();

  const handleLocationUpdate = () => {
    if (isRecording && location) {
      setCurrentRunLocationList((prevList) => {
        const updatedList = [...prevList, location];
        if (updatedList.length > 1) {
          let prevPoint = updatedList.at(-2);
          if (prevPoint) {
            setDistance(distance + 1);
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

  const onResumeClick = () => {
    setisPaused(false);
  };

  const { addRoute } = useRoutes(); // <-- use context instead of repo directly

  const onStopClick = async () => {
    stopTracking();

    if (!recordingStartTime) return;

    const route: Route = {
      start_time: recordingStartTime,
      duration: elapsedTime,
      distance,
      pace,
    };

    const points = currentRunLocationList.map((x) => ({
      timestamp: x.timestamp,
      latitude: x.coords.latitude,
      longitude: x.coords.longitude,
    }));

    await addRoute(route, points); // pass points separately
    resetAllState();
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
    if (!isRecording || isPaused) return;

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - recordingStartTime);
    }, 1000); // update every 1s — adjust if needed

    return () => clearInterval(interval);
  };
  useEffect(handleTime, [isRecording, isPaused, recordingStartTime]);

  const handlePace = () => {
    if (distance > 0) {
      setPace(computePace(distance, elapsedTime)); // computePace returns units of sec/km -- format data in UI
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
    onResumeClick,
    onStopClick,
    distance,
    elapsedTime,
    pace,
  };
};
