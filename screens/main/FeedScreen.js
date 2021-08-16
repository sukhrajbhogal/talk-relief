import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { database } from "../../firebase";

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

  const userID = useSelector((state) => state.auth.userId);

  // Makes sure custom font is finished loading
  const [fontLoaded, setFontLoaded] = useState(false);

  const saveTokenToDatabase = async (token) => {
    console.log("state user id", userID)
    database
      .collection("users")
      .doc(userID)
      .update({
        token: token,
      });
  };
  useEffect(() => {
    messaging().requestPermission();
    messaging()
      .getToken()
      .then(token => {
        console.log("token, ", token)
        return saveTokenToDatabase(token);
      });
    

    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    });
  }, []);

  useEffect(() => {
    
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute("Inbox"); // e.g. "Settings"
        }
      });
    messaging().onMessage(async remoteMessage => {
      console.log("message received", remoteMessage)
    });

  }, []);



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
