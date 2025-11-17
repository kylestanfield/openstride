import { SQLiteDatabase } from "expo-sqlite";

export const StorageService = {
  async initIfNeeded(db: SQLiteDatabase) {
    const DATABASE_VERSION = 1;

    const result = await db.getFirstAsync<{ user_version: number }>(
      "PRAGMA user_version",
    );
    const currentDbVersion = result?.user_version ?? 0;

    if (currentDbVersion >= DATABASE_VERSION) {
      return;
    }
    if (currentDbVersion === 0) {
      await db.execAsync(`PRAGMA journal_mode = 'wal';`);
      await db.execAsync("PRAGMA foreign_keys = ON;");
      await db.execAsync(
        `CREATE TABLE routes (
        id INTEGER PRIMARY KEY,
        start_time INTEGER NOT NULL,
        duration INTEGER NOT NULL,
        distance REAL NOT NULL,
        pace INTEGER NOT NULL);`,
      );
      await db.execAsync(
        `CREATE TABLE points (
        id INTEGER PRIMARY KEY,
        route_id INTEGER NOT NULL REFERENCES routes(id),
        timestamp INTEGER NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        FOREIGN KEY (route_id) REFERENCES routes(id));`,
      );
      await db.execAsync(`
      CREATE INDEX idx_points_route_id ON points(route_id);
    `);
      await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    }
  },
};
