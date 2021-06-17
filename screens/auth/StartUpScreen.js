import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";

const StartUpScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        dispatch(authActions.setDidTryAL());
        //props.navigation.navigate("Auth");
        return;
      }
      console.log("Trying auto login");

      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;

      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        console.log(
          "Expired token or token/userId cannot be found for autologin. Redirecting to Auth Screen"
        );
        dispatch(authActions.setDidTryAL());
        //props.navigation.navigate("Auth");
        return;
      }
      console.log("AL successful");
      console.log("User ID: " + userId);
      console.log(userData);
      dispatch(authActions.authenticate(userId, token));
      //props.navigation.navigate("Home");
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color="#202020" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default StartUpScreen;
