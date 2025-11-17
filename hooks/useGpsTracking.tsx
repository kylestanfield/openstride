// This hook handles interaction with the Location system from Expo.

import { useState, useEffect } from "react";

import * as Location from "expo-location";

import { Point, Route } from "@/hooks/useRouteRepository";

export const convertLocationToPoint = (
  loc: Location.LocationObject,
): Point => ({
  id: 0, // SQLite will auto-increment
  routeId: 0, // will set after inserting Route
  timestamp: loc.timestamp,
  latitude: loc.coords.latitude,
  longitude: loc.coords.longitude,
});

export const useGpsTracking = () => {
  const [location, setLocation] =
    useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [isTracking, setIsTracking] = useState(false);
  const [locationSubscription, setLocationSubscription] =
    useState<Location.LocationSubscription | null>(null);
  const [route, setRoute] = useState<Location.LocationObject[]>([]);

  const startTracking = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      setIsTracking(false);
      return;
    }

    setErrorMsg(null);
    setIsTracking(true);
    const options: Location.LocationOptions = {
      accuracy: Location.Accuracy.BestForNavigation, // use the best accuracy available for GPS
      distanceInterval: 5, // only receive updates every 5 meters
      timeInterval: 1000, // Only update every second (might only work on Android..)
    };
    const subscription = await Location.watchPositionAsync(
      options,
      (newLocation) => {
        setLocation(newLocation);
        setRoute((prevRoute) => [...prevRoute, newLocation]);
      },
    );
    setLocationSubscription(subscription);
  };

  const stopTracking = () => {
    setIsTracking(false);
    if (locationSubscription) {
      locationSubscription.remove();
    }
    setLocation(null);
  };

  useEffect(() => {
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [locationSubscription]);

  return {
    location,
    errorMsg,
    isTracking,
    route,
    startTracking,
    stopTracking,
  };
};
