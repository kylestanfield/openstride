import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Animated,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  DimensionValue,
} from "react-native";

// Define the shape of a single tab item
export interface TabItem {
  title: string;
}

// Define the props for the component
interface TabSelectorProps {
  tabs: TabItem[];
  onChangeTab?: (index: number) => void;
  style?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
  backgroundColor?: string;
  activeColor?: string;
  textColor?: string;
  initialIndex?: number;
}

const TabSelectorAnimation: React.FC<TabSelectorProps> = ({
  tabs = [],
  onChangeTab,
  style,
  styleTitle,
  backgroundColor,
  activeColor,
  textColor,
  initialIndex = 0,
}) => {
  // State to track the width of the container
  const [layoutWidth, setLayoutWidth] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);

  // Animated value for the sliding pill
  const translateX = useRef(new Animated.Value(0)).current;

  // Handle the slide animation
  const handleSlide = (index: number) => {
    setActiveIndex(index);
    if (onChangeTab) onChangeTab(index);

    // Calculate the width of a single tab based on container width
    const tabWidth = layoutWidth / tabs.length;

    Animated.spring(translateX, {
      toValue: tabWidth * index,
      useNativeDriver: true,
      bounciness: 8,
      speed: 12,
    }).start();
  };

  // Recalculate position if layout changes (e.g., rotation)
  useEffect(() => {
    if (layoutWidth > 0) {
      const tabWidth = layoutWidth / tabs.length;
      translateX.setValue(tabWidth * activeIndex);
    }
  }, [layoutWidth, tabs.length]);

  // Logic to determine pill width
  const tabWidth = layoutWidth > 0 ? layoutWidth / tabs.length : 0;
  // Make the pill slightly smaller than the tab for the 'margin' effect
  const pillWidth = tabWidth > 4 ? tabWidth - 4 : 0;

  return (
    <View
      style={[
        styles.container,
        style,
        { backgroundColor: backgroundColor || "#F2F2F2" },
      ]}
      onLayout={(event: LayoutChangeEvent) =>
        setLayoutWidth(event.nativeEvent.layout.width)
      }
    >
      {/* The Sliding Pill */}
      {layoutWidth > 0 && (
        <Animated.View
          style={[
            styles.animatedView,
            {
              width: pillWidth as DimensionValue, // Explicit cast for RN types
              backgroundColor: activeColor || "#FFFFFF",
              transform: [{ translateX }],
            },
          ]}
        />
      )}

      {/* The Clickable Tabs */}
      {tabs.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <TouchableOpacity
            key={`${item.title}-${index}`}
            style={styles.tab}
            onPress={() => handleSlide(index)}
            activeOpacity={0.9}
          >
            <Text
              style={[
                styles.textTitle,
                styleTitle,
                {
                  color: textColor || "#000",
                  fontWeight: isActive ? "600" : "400",
                  opacity: isActive ? 1 : 0.6,
                },
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    height: 44,
    paddingHorizontal: 2,
    position: "relative",
  },
  tab: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  textTitle: {
    fontSize: 14,
  },
  animatedView: {
    position: "absolute",
    height: "90%",
    top: "5%",
    left: 2,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default TabSelectorAnimation;
