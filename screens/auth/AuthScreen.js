import React, { useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthScreen = (props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" animated={true} />
      <Text style={styles.Title}>TalkRelief</Text>
      <Text style={styles.Subtitle}>Lift others and get lifted in return</Text>
      <Button title="Log In" onPress={() => navigation.navigate("Login")}>
        Log In
      </Button>
      <Button title="Sign Up" onPress={() => navigation.navigate("Signup")}>
        Sign Up
      </Button>
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
  Title: {
    fontSize: 50,
    fontWeight: "700",
  },
  Subtitle: {
    fontSize: 24,
    fontWeight: "700",
    padding: 20,
  },
});

export default AuthScreen;
