import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";

const StartUpScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        dispatch(authActions.setDidTryAL());
        props.navigation.navigate("Auth");
        return;
      }
      console.log("auto Login");

      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      console.log(userId);

      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        console.log("Redirecting to Auth Screen");
        dispatch(authActions.setDidTryAL());
        props.navigation.navigate("Auth");
        return;
      }

      dispatch(authActions.authenticate(userId, token));
      props.navigation.navigate("Home");
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
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
