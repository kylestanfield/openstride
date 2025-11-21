import { JSX, useRef } from "react";
import { Animated } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import ActivityCard from "./ActivityCard";
import { PersistedRoute } from "@/types";

interface ActivityItemProps {
  item: PersistedRoute;
  deleteRoute: (id: number) => Promise<void>;
  renderRightActions: (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => JSX.Element;
}

export default function ActivityItem({
  item,
  deleteRoute,
  renderRightActions,
}: ActivityItemProps) {
  const height = useRef(new Animated.Value(70)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const onDelete = async () => {
    Animated.parallel([
      Animated.timing(height, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(async () => {
      await deleteRoute(item.id);
    });
  };

  return (
    <Animated.View style={{ height, opacity, overflow: "hidden" }}>
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableWillOpen={onDelete}
      >
        <ActivityCard route={item} />
      </Swipeable>
    </Animated.View>
  );
}
