import { useTheme } from "@/hooks/useTheme";
import { PersistedRoute, Route } from "@/types";
import { View, StyleSheet, Text, FlatList } from "react-native";
import ActivityCard from "./ActivityCard";

interface ActivityListProps {
  routeList: PersistedRoute[];
}

interface Props {
  item: PersistedRoute;
}

export default function ActivityList({ routeList }: ActivityListProps) {
  const { theme } = useTheme();
  const renderActivity = ({ item }: Props) => (
    <ActivityCard route={item} />
  );
  return (
    <FlatList
      data={routeList}
      renderItem={renderActivity}
    />
  );
}
