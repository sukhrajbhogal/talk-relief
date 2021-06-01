import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
} from "react-native";

const SplashScreen = (props) => {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" animated={true} />
      <Text style={styles.Title}>TalkRelief</Text>
      <Text style={styles.Subtitle}>Lift others and get lifted in return</Text>
      <Button title="Sign in">Sign in</Button>
      <Button title="Register">Register</Button>
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

export default SplashScreen;
