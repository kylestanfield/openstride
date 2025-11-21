import { useTheme } from "@/hooks/useTheme";
import { PersistedRoute, Route } from "@/types";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Animated,
} from "react-native";
import ActivityCard from "./ActivityCard";
import {
  Swipeable,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { themes } from "@/constants/theme";
import { useRouteRepository } from "@/hooks/useRouteRepository";
import { useRoutes } from "@/context/RouteContext";
import { useRef } from "react";
import ActivityItem from "./ActivityItem";

interface Props {
  item: PersistedRoute;
}

export default function ActivityList() {
  const { theme } = useTheme();

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

  const renderActivity = ({ item }: Props) => (
    <ActivityItem
      item={item}
      deleteRoute={deleteRoute}
      renderRightActions={renderRightActions}
    />
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
