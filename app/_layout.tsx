import { RouteProvider } from "@/context/RouteContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { StorageService } from "@/services/StorageService";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="openstride.db"
      onInit={StorageService.initIfNeeded}
      options={{ enableChangeListener: true }}
    >
      <RouteProvider>
        <ThemeProvider>
          <GestureHandlerRootView>
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false }}
              />
            </Stack>
          </GestureHandlerRootView>
        </ThemeProvider>
      </RouteProvider>
    </SQLiteProvider>
  );
}
