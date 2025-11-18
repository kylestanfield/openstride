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
    const options: Location.LocationOptions = {
      accuracy: Location.Accuracy.BestForNavigation, // use the best accuracy available for GPS
      distanceInterval: 5, // only receive updates every 5 meters
      timeInterval: 1000, // Only update every second (might only work on Android..)
    };
    const subscription = await Location.watchPositionAsync(
      options,
      (newLocation) => {
        setLocation(newLocation);
      },
    );
    setLocationSubscription(subscription);
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
