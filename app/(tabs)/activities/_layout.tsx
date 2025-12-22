import { Stack } from "expo-router";

export default function ActivitiesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Activities", headerShown: false }}
      />
      <Stack.Screen
        name="RoutePage"
        options={{ title: "Route Details" }}
      />
    </Stack>
  );
}
