import React, { useState, useEffect, useCallback, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase";
import { database } from "../../firebase";

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
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as authActions from "../../store/actions/auth";
import { FloatingLabelInput } from "react-native-floating-label-input";
import "../../components/globalInputStyles";
import RNPickerSelect from "react-native-picker-select";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import hidePassword from "../../assets/eye.png";
import showPassword from "../../assets/eye-off.png";

const options = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "nonbinary", label: "Non-binary" },
  { value: "transgender", label: "Transgender" },
  { value: "intersex", label: "Intersex" },
  { value: "none", label: "I prefer not to say" },
];

const SignUpScreenV2 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const [userNameText, setUserNameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [userId, setUserId] = useState("");
  const [show, setShow] = useState(false);
  const [birthday, setBirthday] = useState("");
  // const [gender, setGender] = useState("");

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

  // const genderChangeHandler = (text) => {
  //   //setGender(text);
  // };

  const getUserId = async () => {
    try {
      const value = await AsyncStorage.getItem("userData");
      if (value != null) {
        console.log(value);
        const uid = JSON.parse(value).userId;
        genUserProfile(uid);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const genUserProfile = (uid) => {
    database
      .collection("users")
      .doc(uid)
      .set({
        username: uid,
        birthday: "",
        gender: "",
      })
      .then(() => {
        database.collection("users").doc(uid).collection("posts").add({});
      })
      .then(() => {
        database.collection("users").doc(uid).collection("replies").add({});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Sign Up Failed", error, [{ text: "Okay" }]);
    }
    setError(null);
  }, [error]);

  const signUpHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(authActions.signup(userNameText, emailText, passwordText));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
    getUserId();
  };

  const placeholder = {
    label: "What's your gender?",
    value: null,
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
              returnKeyType="next"
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
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              placeholder={placeholder}
              required
              items={[
                { label: "Female", value: "female" },
                { label: "Male", value: "male" },
                { label: "Non-binary", value: "nonbinary" },
                { label: "Transgender", value: "transgender" },
                { label: "Intersex", value: "intersex" },
                { label: "I prefer not to say", value: "none" },
              ]}
              Icon={() => {
                return (
                  <MaterialCommunityIcons
                    name="chevron-down"
                    color={"#202020"}
                    size={40}
                    style={styles.chevron}
                  />
                );
              }}
              style={{
                ...pickerSelectStyles,
              }}
            />

            {/* Display a loading animation when user account is being created */}

            <TouchableHighlight
              activeOpacity={1}
              underlayColor="rgba(0,0,0,0.7)"
              style={styles.btnBG}
              onPress={signUpHandler}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.btnText}>Create Account</Text>
              )}
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
  chevron: {
    paddingTop: 8,
    paddingRight: 10,
    alignItems: "center",
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

const pickerSelectStyles = StyleSheet.create({
  placeholder: { color: "#202020" },
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 4,
    color: "#202020",
    paddingRight: 30, // to ensure the text is never behind the icon
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "#202020",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default SignUpScreenV2;
