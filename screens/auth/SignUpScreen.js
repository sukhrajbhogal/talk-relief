import React, { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  Linking,
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
//import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";

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

  // const [error, setError] = useState();

  const [userNameText, setUserNameText] = useState("");
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordText, setPasswordText] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [show, setShow] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [birthdayIsValid, setBirthdayIsValid] = useState(false);
  const [gender, setGender] = useState("");
  const [genderIsValid, setGenderIsValid] = useState(false);
  const [uid, setUid] = useState("");

  const userInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const birthdayInput = useRef(null);
  const genderInput = useRef(null);

  const [isFocused, setIsFocused] = useState(false);

  const userNameChangeHandler = (text) => {
    if (text.length === 0) {
      setUsernameIsValid(false);
    } else {
      setUsernameIsValid(true);
    }
    setUserNameText(text);
  };

  const emailChangeHandler = (text) => {
    if (text.length === 0) {
      setEmailIsValid(false);
    } else {
      setEmailIsValid(true);
    }
    setEmailText(text);
  };

  const passwordChangeHandler = (text) => {
    if (text.length < 6) {
      setPasswordIsValid(false);
    } else {
      setPasswordIsValid(true);
    }
    setPasswordText(text);
  };

  const birthdayChangeHandler = (text) => {
    if (text.length < 8) {
      setBirthdayIsValid(false);
    } else {
      setBirthdayIsValid(true);
    }
    setBirthday(text);
    console.log(birthday);
  };

  const genderChangeHandler = (text) => {
    if (text === "null") {
      setGenderIsValid(false);
    } else {
      setGenderIsValid(true);
    }
    setGender(text);
    console.log(gender);
  };

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

  const genUserProfile = async (uid) => {
    console.log("generating user profile for: " + uid);
    let pushToken;
    let statusObj = await Notifications.getPermissionsAsync();
    if (
      statusObj.ios?.status ===
      Notifications.IosAuthorizationStatus.NOT_DETERMINED
    ) {
      statusObj = await Notifications.requestPermissionsAsync();
    }
    if (statusObj.ios?.status === Notifications.IosAuthorizationStatus.DENIED) {
      pushToken = null;
    } else {
      pushToken = (await Notifications.getDevicePushTokenAsync()).data;
      
      console.log("USER TOKEN: " + pushToken);
    }
    database
      .collection("users")
      .doc(uid)
      .set({
        username: uid,
        birthday: birthday,
        gender: gender,
        pushToken: pushToken,
      })
      .then(() => {
        console.log("generating posts collection");
        database.collection("users").doc(uid).collection("posts").add({});
      })
      .then(() => {
        console.log("generating replies collection");
        database.collection("users").doc(uid).collection("replies").add({});
      })
      .then(() => {
        console.log("generating blocked collection");
        database.collection("users").doc(uid).collection("blocked").add({});
      })
      .catch((err) => {
        console.log("ERROR: " + err);
      });
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Sign Up Failed", error, [{ text: "Okay" }]);
    }
    setError(null);
  }, [error]);

  const signUpHandler = async () => {
    if (
      usernameIsValid === false ||
      emailIsValid === false ||
      passwordIsValid === false ||
      genderIsValid === false
    ) {
      setError(
        "The username, email, birthday is empty or the password is less than 6 characters!"
      );
    } else {
      setIsLoading(true);
      await dispatch(authActions.signup(userNameText, emailText, passwordText));
      setIsLoading(false);
      getUserId();
      //genUserProfile(uid);
    }
  };

  const genderPlaceholder = {
    label: "What's your gender?",
    value: "null",
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" animated={true} />

      {/* Header */}
      {/* <View style={styles.header}>
        <Text>Already have an account?</Text>
        <TouchableOpacity activeOpacity={0.5}>
          <Text
            style={styles.login}
            onPress={() => navigation.navigate("Login")}
          >
            Log in
          </Text>
        </TouchableOpacity>
      </View> */}

      {/* Form */}
      <ScrollView style={styles.container}>
        <View>
          <View style={styles.innerHeader}>
            <Text style={styles.title}>Welcome to TalkRelief</Text>
            <TouchableOpacity activeOpacity={0.5}>
              <Text
                style={styles.login}
                onPress={() => navigation.navigate("Login")}
              >
                Log in
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>
            Create an account to join our supportive community.
          </Text>
        </View>
        <FloatingLabelInput
          id="username"
          textContentType="username"
          label="Username"
          value={userNameText}
          ref={userInput}
          required
          maxLength={20}
          autoCapitalize="none"
          keyboardType="default"
          returnKeyType="next"
          errorText="Please enter a valid username"
          onChangeText={userNameChangeHandler}
          onSubmitEditing={() => {
            emailInput.current.focus();
          }}
        />

        <FloatingLabelInput
          id="email"
          textContentType="emailAddress"
          label="Email address"
          value={emailText}
          ref={emailInput}
          required
          maxLength={35}
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          errorText="Please enter a valid email address"
          onChangeText={emailChangeHandler}
          onSubmitEditing={() => {
            passwordInput.current.focus();
          }}
        />
        <FloatingLabelInput
          id="password"
          textContentType="password"
          label="Password (8+ characters)"
          value={passwordText}
          ref={passwordInput}
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
          onSubmitEditing={() => {
            birthdayInput.current.focus();
          }}
        />
        <FloatingLabelInput
          id="birthday"
          label="Birthday (MM/DD/YYYY)"
          mask="99/99/9999"
          value={birthday}
          ref={birthdayInput}
          required
          maxLength={20}
          autoCapitalize="none"
          keyboardType="numeric"
          returnKeyType="done"
          errorText="Please enter a valid username"
          onChangeText={birthdayChangeHandler}
          // onSubmitEditing={() => {
          //   genderInput.current.onOpen();
          // }}
        />
        <RNPickerSelect
          onValueChange={genderChangeHandler}
          placeholder={genderPlaceholder}
          ref={genderInput}
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

        <Text style={styles.subtitle}>
          By continuing, you confirm you are over 18 and accept our{" "}
          <Text
            style={styles.disclaimerLink}
            onPress={() =>
              Linking.openURL("https://talkrelief.app/terms-of-service")
            }
          >
            Terms
          </Text>{" "}
          and{" "}
          <Text
            style={styles.disclaimerLink}
            onPress={() =>
              Linking.openURL("https://talkrelief.app/privacy-policy")
            }
          >
            Privacy Policy
          </Text>
          .
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF1E4",
  },
  header: {
    flexDirection: "row",
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottomWidth: 0.75,
    borderBottomColor: "#E8D7CC",
    backgroundColor: "#FFF1E4",
  },
  innerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    marginTop: 20,
    justifyContent: "space-between",
  },
  container: {
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
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
    alignItems: "center",
    color: "#C83E6F",
    fontWeight: "700",
    // marginHorizontal: 5,
    // marginVertical: 10,
    fontSize: 20,
  },
  disclaimerLink: {
    color: "#C83E6F",
    textDecorationLine: "underline",
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
