import React from "react";
import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";

// Displays dot pagination for onboarding slides with opacity animation
const Paginator = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {data.map((_, i) => {
        // Variables for previous dot, current dot, and next dot
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        // Change opacity of dots based on current slide
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.25, 1, 0.25],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[styles.dot, { width: 10, opacity }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 64,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#C83E6F",
    marginHorizontal: 8,
    marginTop: 20,
  },
});
