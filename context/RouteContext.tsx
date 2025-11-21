import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { PersistedRoute, Point, Route } from "@/types";
import { useRouteRepository } from "@/hooks/useRouteRepository";
import * as SQLite from "expo-sqlite";
import { LayoutAnimation } from "react-native";

const RouteContext = createContext<RouteContextValue | null>(null);

interface RouteContextValue {
  routes: PersistedRoute[];
  addRoute: (route: Route, points: Point[]) => Promise<void>;
  deleteRoute: (id: number) => Promise<void>;
  deleteRouteWithAnimation: (id: number) => Promise<void>;
}

export const RouteProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const repo = useRouteRepository();
  const [routes, setRoutes] = useState<PersistedRoute[]>([]);

  const fetchRoutes = async () => {
    const all = await repo.getAllRoutes();
    setRoutes(all);
  };

  useEffect(() => {
    fetchRoutes(); // initial load

    const subscription = SQLite.addDatabaseChangeListener((event) => {
      if (
        event.databaseName === "openstride.db" &&
        event.tableName === "routes"
      ) {
        fetchRoutes();
      }
    });

    return () => subscription.remove();
  }, []);

  const addRoute = async (route: Route, points: Point[]) => {
    // Save route + points to the database
    const routeId = await repo.saveRouteWithPoints(route, points);

    // Update context state so UI re-renders
    const newRoute: PersistedRoute = { ...route, id: routeId };
    setRoutes((prev) => [newRoute, ...prev]);
  };

  const deleteRoute = async (id: number) => {
    await repo.deleteRoute(id); // remove from DB
    setRoutes((prev) => prev.filter((r) => r.id !== id)); // update state
  };

  const deleteRouteWithAnimation = async (id: number) => {
    // Animate the next layout change (removal of the item)
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut,
    );

    await deleteRoute(id); // remove from state after animation
  };

  return (
    <RouteContext.Provider
      value={{
        routes,
        addRoute,
        deleteRoute,
        deleteRouteWithAnimation,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};

export const useRoutes = () => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error("useRoutes must be used within a RouteProvider");
  }
  return context;
};
