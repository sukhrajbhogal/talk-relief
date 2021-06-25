import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CardList from "../../components/CardList";
import OnboardingScreen from "../auth/OnboardingScreen";

const FeedScreen = (props) => {
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  // Onboarding
  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");
      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (err) {
      console.log("Error @checkOnboarding: ", err);
    }
  };
  useEffect(() => {
    checkOnboarding();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" animated={true} />
      {/* If user has viewed onboarding, show feed. Otherwise, show onboarding. */}
      {viewedOnboarding ? <CardList /> : <OnboardingScreen />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF1E4",
  },
});

export default FeedScreen;
