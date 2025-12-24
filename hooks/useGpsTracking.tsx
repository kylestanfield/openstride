// This hook handles interaction with the Location system from Expo.

import { useState, useEffect } from "react";

import * as Location from "expo-location";

export const useGpsTracking = () => {
  const [location, setLocation] =
    useState<Location.LocationObject | null>(null);
  const [locationSubscription, setLocationSubscription] =
    useState<Location.LocationSubscription | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const startTracking = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    setErrorMsg(null);
    try {
      const options: Location.LocationOptions = {
        accuracy: Location.Accuracy.BestForNavigation, // use high accuracy
        distanceInterval: 5, // only receive updates every 5 meters
        timeInterval: 5000, // Only update every 5 seconds
      };
      const subscription = await Location.watchPositionAsync(
        options,
        (newLocation) => {
          setLocation(newLocation);
        },
      );
      setLocationSubscription(subscription);
    } catch (error) {
      setErrorMsg("Failed to start location tracking.");
      console.error(error); // In a real app, you'd log this to Sentry or another error reporting service.
    }
  };

  const stopTracking = () => {
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
    startTracking,
    stopTracking,
  };
};
