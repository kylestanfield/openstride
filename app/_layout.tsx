import { StorageService } from "@/services/StorageService";
import { Stack } from "expo-router";
import {
  SQLiteProvider,
  useSQLiteContext,
  type SQLiteDatabase,
} from "expo-sqlite";

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="openstride.db"
      onInit={StorageService.initIfNeeded}
    >
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>
    </SQLiteProvider>
  );
}
