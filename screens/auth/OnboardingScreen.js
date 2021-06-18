import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
} from "react-native";

import OnboardingSlides from "../../models/OnboardingSlides";
import OnboardingItem from "../../components/OnboardingItem";
import Paginator from "../../components/Paginator";
import NextButton from "../../components/NextButton";
import { useNavigation } from "@react-navigation/native";

// Shows each onboarding screen (3) as a horizontal flatlist with a carousel effect
const OnboardingScreen = () => {
  const navigation = useNavigation();

  // Get the index of the current slide shown on screen (3 slides : 0, 1, 2)
  const [currentSlide, setCurrentSlide] = useState(0);

  // animation value linked to current slide
  const scrollX = useRef(new Animated.Value(0)).current;

  const slidesRef = useRef(null);

  // Set the state of currentSlide to the slide that is currently on the screen
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentSlide(viewableItems[0].index);
  }).current;

  // When swiping, the next slide has to cover 50% before it moves to the next slide (prevents accidental swipes)
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // Next button moves to the next slide
  const scrollTo = () => {
    if (currentSlide < OnboardingSlides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentSlide + 1 });
    } else {
      console.log("Last item.");
      //At the end, go back to the previous screen
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={OnboardingSlides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
              // we're animating with width, but useNativeDriver doesn't support width
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={OnboardingSlides} scrollX={scrollX} />
      <NextButton
        scrollTo={scrollTo}
        percentage={(currentSlide + 1) * (100 / OnboardingSlides.length)}
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF1E4",
  },
});
