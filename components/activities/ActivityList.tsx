import { useTheme } from "@/hooks/useTheme";
import { PersistedRoute } from "@/types";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Animated,
  Pressable,
} from "react-native";
// ActivityCard is commented out as it wasn't used in the original snippet
// import ActivityCard from "./ActivityCard";
import {
  // Swipeable is correctly used in ActivityItem, but is often imported here for completeness
  Swipeable,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { themes } from "@/constants/theme"; // Keep if used in styles or theme hook
import { useRouteRepository } from "@/hooks/useRouteRepository"; // Keep if used in the component logic
import { useRoutes } from "@/context/RouteContext";
import React, { useRef } from "react";
import ActivityItem from "./ActivityItem";

// --- Expo Router Imports ---
import { Router, useRouter } from "expo-router";

// --- Removed React Navigation Imports ---
// import {
//   createStaticNavigation,
//   useNavigation,
// } from "@react-navigation/native";
// import { RootStackParamList } from "@/app/AppNavigator";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface RenderProps {
  item: PersistedRoute;
}

interface CustomRouter extends Router {
  // Overload or extend the push method to accept a generic object
  // (which is used for pathname and params)
  push: (path: string | object) => void;
}

export default function ActivityList() {
  const { theme } = useTheme();

  // 1. Use useRouter hook from expo-router
  // Type assertion used to allow passing the object syntax with parameters
  const router = useRouter() as CustomRouter;

  const { routes, deleteRoute, deleteRouteWithAnimation } = useRoutes();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      minHeight: 300,
      paddingBottom: theme.spacing[2],
    },
    row: {
      flexDirection: "row",
      flex: 1,
      alignItems: "center",
      paddingLeft: 5,
      backgroundColor: "#efefef",
      margin: 20,
      minHeight: 50,
    },
    swipedRow: {
      flexDirection: "row",
      flex: 1,
      alignItems: "center",
      paddingLeft: 5,
      backgroundColor: theme.colors.background,
      margin: 20,
      minHeight: 50,
    },
    deleteButton: {
      backgroundColor: theme.colors.accent[800],
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    deleteButtonText: {
      color: theme.colors.text.primary,
      fontWeight: "bold",
      fontSize: theme.typography.size.lg,
      paddingRight: theme.spacing[4],
    },
  });

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    const opacity = dragX.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.swipedRow}>
        <Animated.View style={[styles.deleteButton, { opacity }]}>
          <TouchableOpacity>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  const renderActivity = ({ item }: RenderProps) => (
    // 2. Use router.push with object syntax to pass data as a parameter
    <Pressable
      onPress={
        () =>
          router.push({
            // Path to your static screen component (e.g., app/(tabs)/RoutePage.tsx)
            pathname: "/RoutePage",
            // Pass the item object by stringifying it
            params: { routeData: item },
          } as any) // Type assertion to satisfy TypeScript
      }
    >
      <ActivityItem
        item={item}
        deleteRoute={deleteRoute}
        renderRightActions={renderRightActions}
      />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={routes}
        renderItem={renderActivity}
      />
    </View>
  );
}
