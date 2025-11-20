import { useState, useEffect } from "react";
import { useRouteRepository } from "./useRouteRepository";
import { PersistedRoute, Route } from "@/types";

export const useActivities = () => {
  const [routeList, setRouteList] = useState<PersistedRoute[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const {
    getAllRoutes,
    createRoute,
    getRouteWithPoints,
    deleteRoute,
    saveRouteWithPoints,
  } = useRouteRepository();

  const previous_routes = async () => {
    setIsLoading(true);
    const result = await getAllRoutes();
    setRouteList(result);
    setIsLoading(false);
  };

  // Load the activities from the database on component mount
  useEffect(() => {
    previous_routes();
  }, []);

  return {
    isLoading,
    routeList,
  };
};
