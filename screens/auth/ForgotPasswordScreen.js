import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { FloatingLabelInput } from "react-native-floating-label-input";
import "../../components/globalInputStyles";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [emailText, setEmailText] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);

  const emailChangeHandler = (text) => {
    if (text.length === 0) {
      setEmailIsValid(false);
    } else {
      setEmailIsValid(true);
    }
    setEmailText(text);
  };

  const forgotPasswordHandler = async () => {
    if (!emailIsValid) {
      Alert.alert("Invalid Email", "Please enter a valid email address", [
        { text: "Okay" },
      ]);
    } else {
      Alert.alert(
        "Password Reset Email Sent!",
        "Please check your email for instructions to reset your password",
        [{ text: "Okay" }]
      );
      auth.sendPasswordResetEmail(emailText).then(() => {
        console.log("email sent");
        navigation.navigate("Auth");
      }).catch;
    }
  };
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" animated={true} />
      <View style={styles.Header}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="arrow-left-bold-circle-outline"
            size={30}
            color={"#202020"}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text>New to TalkRelief?</Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Text
              style={styles.signup}
              onPress={() => navigation.navigate("Signup")}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>
        <FloatingLabelInput
          id="email"
          textContentType="emailAddress"
          label="Email address"
          value={emailText}
          required
          maxLength={35}
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          errorText="Please enter a valid email address"
          onChangeText={emailChangeHandler}
        />

        <TouchableOpacity
          style={styles.btnBG}
          underlayColor="rgba(0,0,0,0.7)"
          onPress={forgotPasswordHandler}
        >
          <Text style={styles.btnText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF1E4",
  },
  container: {
    marginHorizontal: 15,
  },
  Header: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottomWidth: 0.75,
    borderBottomColor: "#E8D7CC",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 15,
    marginTop: 30,
  },
  btnBG: {
    backgroundColor: "rgba(0,0,0,0.9)",
    padding: 10,
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 30,
    minWidth: 300,
    marginBottom: 25,
    borderWidth: 2,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  signup: {
    color: "#C83E6F",
    fontWeight: "700",
    marginLeft: 5,
    marginHorizontal: 5,
    marginVertical: 10,
  },
});
