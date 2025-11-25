import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState, useMemo } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { PersistedPoint, PersistedRoute } from "@/types";
import RouteMap from "@/components/route/RouteMap";
import { useRouteRepository } from "@/hooks/useRouteRepository";
import { useSQLiteContext } from "expo-sqlite";

export default async function RoutePage() {
  const { routeData } = useLocalSearchParams();
  const { getPoints, dumpDatabase } = useRouteRepository();
  const db = useSQLiteContext();

  const route: PersistedRoute | null = useMemo(() => {
    if (!routeData || typeof routeData !== "string") return null;
    try {
      return JSON.parse(routeData);
    } catch (e) {
      console.error("Failed to parse routeData:", e);
      return null;
    }
  }, [routeData]);

  const [points, setPoints] = useState<PersistedPoint[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch points only once when route is available
  useEffect(() => {
    if (!route) return;

    const loadPoints = async () => {
      setLoading(true);
      const result = await getPoints(route.id);
      setPoints(result);
      setLoading(false);
    };

    loadPoints();
    console.log("Fetched points:", points);
    dumpDatabase();
  }, [route, getPoints]);

  if (!route) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Error: Route data not found or invalid.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <View style={{ flex: 1 }}>
            <RouteMap coords={points} />
          </View>
          <View style={{ padding: 16 }}>
            <Text>Distance: {route.distance}</Text>
            {/* Add more route details here */}
          </View>
        </>
      )}
    </View>
  );
}
