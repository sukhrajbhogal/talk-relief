import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthScreen = () => {
  const navigation = useNavigation();
  // const bg;

  return (
    <ImageBackground
      source={require("../../assets/Example.png")}
      style={styles.screen}
    >
      <StatusBar barStyle="light-content" animated={true} />
      <SafeAreaView style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.title}>TalkRelief</Text>
          <Text style={styles.subtitle}>
            A place to express how you’re feeling and receive comforting words
            from the community.
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="rgba(0,0,0,0.7)"
            style={styles.signupBG}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="rgba(255,255,255,0.2)"
            style={styles.loginBG}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.btnText}>Login</Text>
          </TouchableHighlight>
          {/* <Button
            title="Sign Up"
            color="white"
            onPress={() => navigation.navigate("Signup")}
          />
          <Button
            title="Log In"
            color="white"
            onPress={() => navigation.navigate("Login")}
          /> */}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#C83E6F",
  },
  container: {
    flex: 1,
    margin: 20,
    justifyContent: "space-between",
  },
  body: {
    top: "20%",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    fontFamily: "Cocogoose",
    color: "#fff",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "500",
    color: "#fff",
    marginTop: 15,
    marginBottom: 15,
    lineHeight: 35,
  },
  footer: {
    alignItems: "center",
  },
  signupBG: {
    backgroundColor: "rgba(0,0,0,0.9)",
    padding: 10,
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 30,
    minWidth: 300,
    marginBottom: 10,
    borderWidth: 2,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  loginBG: {
    borderWidth: 2,
    borderColor: "#fff",
    padding: 12,
    borderRadius: 30,
    minWidth: 300,
  },
});

export default AuthScreen;
