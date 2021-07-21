import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";

import CardList from "../../components/CardList";

const FeedScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const navigation = useNavigation();

  const requestUserPermission = async () => {
    const authStatus = await messaging.requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  const Loading = () => {
    return <ActivityIndicator size={"large"} />;
  };

  // Checks user's async storage if they've viewed onboarding
  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");
      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (err) {
      console.log("Error @checkOnboarding: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" animated={true} />
      {/* If user has viewed onboarding, show feed. Otherwise, show onboarding. */}
      {loading ? (
        <Loading />
      ) : viewedOnboarding ? (
        <CardList />
      ) : (
        navigation.navigate("Onboarding")
      )}
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
