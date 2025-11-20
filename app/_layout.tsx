import { ThemeProvider } from "@/context/ThemeContext";
import { StorageService } from "@/services/StorageService";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="openstride.db"
      onInit={StorageService.initIfNeeded}
    >
      <ThemeProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
        </Stack>
      </ThemeProvider>
    </SQLiteProvider>
  );
}
