// This hook handles SQLite

import { PersistedPoint, PersistedRoute, Point, Route } from "@/types";
import { useSQLiteContext } from "expo-sqlite";

export function useRouteRepository() {
  const db = useSQLiteContext();

  return {
    getAllRoutes: async () => {
      const allRows = await db.getAllAsync<PersistedRoute>(
        `SELECT * FROM routes ORDER BY start_time DESC;`,
      );
      console.log("DEBUG: all routes:", allRows); // <-- debug
      return allRows;
    },

    createRoute: async (route: Route) => {
      const result = await db.runAsync(
        `INSERT INTO routes (start_time, duration, distance, pace) VALUES (?, ?, ?, ?);`,
        [route.start_time, route.duration, route.distance, route.pace],
      );
      return result.lastInsertRowId;
    },

    getRouteWithPoints: async (routeId: number) => {
      const route = await db.getFirstAsync<PersistedRoute>(
        `SELECT * FROM routes WHERE id = ?;`,
        [routeId],
      );

      const points = await db.getAllAsync<PersistedPoint>(
        `SELECT * FROM points WHERE route_id = ? ORDER BY timestamp ASC;`,
        [routeId],
      );

      return { ...route, points };
    },

    dumpDatabase: async () => {
      const allRoutes = await db.getAllAsync(`SELECT * FROM routes;`);
      const allPoints = await db.getAllAsync(`SELECT * FROM points;`);
      console.log("DEBUG: Entire DB dump");
      console.log("Routes:", allRoutes);
      console.log("Points:", allPoints);
    },

    getPoints: async (routeId: number) => {
      const points = await db.getAllAsync<PersistedPoint>(
        `SELECT * FROM points WHERE route_id = ? ORDER BY timestamp ASC;`,
        [routeId],
      );
      return points;
    },

    async deleteRoute(routeId: number) {
      await db.execAsync("BEGIN TRANSACTION;");
      try {
        await db.runAsync(`DELETE FROM points WHERE route_id = ?;`, [
          routeId,
        ]);
        await db.runAsync(`DELETE FROM routes WHERE id = ?;`, [
          routeId,
        ]);
        await db.execAsync("COMMIT;");
      } catch (err) {
        await db.execAsync("ROLLBACK;");
        throw err;
      }
    },

    async saveRouteWithPoints(route: Route, points: Point[]) {
      if (points.length === 0) {
        console.warn("No points to save for this route.");
        return -1;
      }
      await db.execAsync(`BEGIN TRANSACTION;`);

      try {
        const result = await db.runAsync(
          `INSERT INTO routes (start_time, duration, distance, pace) VALUES (?, ?, ?, ?);`,
          [
            route.start_time,
            route.duration,
            route.distance,
            route.pace,
          ],
        );
        const routeId = result.lastInsertRowId;

        const placeholders = points.map(() => "(?, ?, ?, ?)").join(",");
        const values = points.flatMap((p) => [
          routeId,
          p.timestamp,
          p.latitude,
          p.longitude,
        ]);

        await db.runAsync(
          `INSERT INTO points (route_id, timestamp, latitude, longitude)
                VALUES ${placeholders};`,
          values,
        );
        await db.execAsync("COMMIT;");
        return routeId;
      } catch (err) {
        await db.execAsync("ROLLBACK;");
        throw err;
      }
    },
  };
}
