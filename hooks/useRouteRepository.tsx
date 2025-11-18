// This hook handles SQLite

import { Point, Route } from "@/types";
import { useSQLiteContext } from "expo-sqlite";

export function useRouteRepository() {
  const db = useSQLiteContext();

  return {
    getAllRoutes: async () => {
      const allRows = await db.getAllAsync<Route>(
        `SELECT * FROM routes ORDER BY start_time DESC;`,
      );
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
      const route = await db.getFirstAsync<Route>(
        `SELECT * FROM routes WHERE id = ?;`,
        [routeId],
      );

      const points = await db.getAllAsync<Point>(
        `SELECT * FROM points WHERE route_id = ? ORDER BY timestamp ASC;`,
        [routeId],
      );

      return { ...route, points };
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
