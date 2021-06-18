import React, { useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Displays a circle next button with a progress bar border
const NextButton = ({ percentage, scrollTo }) => {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  // Re-render progress bar when percentage changes
  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  // Listener for progress animation (smooth transition from one to the next)
  useEffect(() => {
    progressAnimation.addListener(
      (value) => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;

        // check to make sure progressRef has been initialized
        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [percentage]
    );

    // Clean up all listeners when component unmounts
    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          {/* Full progress bar */}
          <Circle
            stroke="rgba(200,62,111,0.1)"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          {/* Completed progress bar */}
          <Circle
            ref={progressRef}
            stroke="#C83E6F"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity
        onPress={scrollTo}
        style={styles.button}
        activeOpacity={0.6}
      >
        <MaterialCommunityIcons
          name="arrow-right"
          size={50}
          color={"#fff"}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
    </View>
  );
};
export default NextButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    backgroundColor: "#C83E6F",
    borderRadius: 100,
    padding: 20,
  },
});
