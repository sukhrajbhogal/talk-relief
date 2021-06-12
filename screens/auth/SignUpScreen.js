import React, { useState, useCallback, useReducer } from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import * as authActions from "../../store/actions/auth";
import { useAnimatedScrollHandler } from "react-native-reanimated";
import { FloatingLabelInput } from "react-native-floating-label-input";
import "../../components/globalInputStyles";

import hidePassword from "../../assets/eye.png";
import showPassword from "../../assets/eye-off.png";

const SignUpScreenV2 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [userNameText, setUserNameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [show, setShow] = useState(false);
  const [birthday, setBirthday] = useState(new Date());

  const [isFocused, setIsFocused] = useState(false);

  const userNameChangeHandler = (text) => {
    setUserNameText(text);
  };
  const emailChangeHandler = (text) => {
    setEmailText(text);
  };

  const passwordChangeHandler = (text) => {
    setPasswordText(text);
  };

  const birthdayChangeHandler = (text) => {
    setBirthday(text);
  };

  const signUpHandler = async () => {
    setIsLoading(true);
    dispatch(authActions.signup(userNameText, emailText, passwordText));
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" animated={true} />

      <View style={styles.Header}>
        <Text>Already have an account?</Text>
        <TouchableOpacity activeOpacity={0.5}>
          <Text
            style={styles.login}
            onPress={() => navigation.navigate("Login")}
          >
            Log in
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <ScrollView style={{ height: "100%" }}>
          <Text style={styles.title}>Welcome to TalkRelief</Text>
          <Text style={styles.subtitle}>
            Create an account to join our supportive community.
          </Text>
          <View>
            <FloatingLabelInput
              id="username"
              textContentType="username"
              label="Username"
              value={userNameText}
              required
              maxLength={20}
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="next"
              errorText="Please enter a valid username"
              onChangeText={userNameChangeHandler}
            />
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
            <FloatingLabelInput
              id="password"
              textContentType="password"
              label="Password (8+ characters)"
              value={passwordText}
              isPassword
              togglePassword={show}
              required
              maxLength={30}
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="join"
              errorText="Please enter a valid password"
              customShowPasswordImage={showPassword}
              customHidePasswordImage={hidePassword}
              onChangeText={passwordChangeHandler}
            />
            <FloatingLabelInput
              id="birthday"
              label="Birthday (MM/DD/YYYY)"
              value={birthday}
              mask="99/99/9999"
              required
              maxLength={20}
              autoCapitalize="none"
              keyboardType="numeric"
              returnKeyType="next"
              errorText="Please enter a valid username"
              onChangeText={birthdayChangeHandler}
            />
            <FloatingLabelInput
              id="Gender"
              label="What is your gender?"
              value={birthday}
              required
              maxLength={20}
              autoCapitalize="none"
              keyboardType="numeric"
              returnKeyType="next"
              errorText="Please enter a valid username"
              //   onChangeText={userNameChangeHandler}
            />
            <TouchableHighlight
              activeOpacity={1}
              underlayColor="rgba(0,0,0,0.7)"
              style={styles.btnBG}
              onPress={signUpHandler}
            >
              <Text style={styles.btnText}>Create Account</Text>
            </TouchableHighlight>
          </View>
          <Text style={styles.subtitle}>
            By continuing, you confirm you are over 13 and accept our Terms and
            Privacy Policy.
          </Text>
        </ScrollView>
        {isLoading ? <ActivityIndicator size="large" /> : <View />}
      </View>
    </SafeAreaView>
  );
};

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
    paddingRight: 10,
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
  subtitle: {
    marginBottom: 15,
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
  login: {
    color: "#C83E6F",
    fontWeight: "700",
    marginHorizontal: 5,
    marginVertical: 10,
  },
});

export default SignUpScreenV2;
