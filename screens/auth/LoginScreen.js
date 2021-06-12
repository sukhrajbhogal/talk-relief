import React, { useState, useCallback, useEffect, useReducer } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import * as authActions from "../../store/actions/auth";
import { FloatingLabelInput } from "react-native-floating-label-input";
import "../../components/globalInputStyles";

import hidePassword from "../../assets/eye.png";
import showPassword from "../../assets/eye-off.png";

// const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

// const formReducer = (state, action) => {
//   if (action.type === FORM_INPUT_UPDATE) {
//     const updatedValues = {
//       ...state.inputValues,
//       [action.input]: action.value,
//     };
//     const updatedValidities = {
//       ...state.inputValidities,
//       [action.input]: action.isValid,
//     };
//     let updatedFormIsValid = true;
//     for (const key in updatedValidities) {
//       updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
//     }
//     return {
//       formIsValid: updatedFormIsValid,
//       inputValidities: updatedValidities,
//       inputValues: updatedValues,
//     };
//   }
//   return state;
// };

const LoginScreen = (props) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [show, setShow] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const emailChangeHandler = (text) => {
    setEmailText(text);
  };

  const passwordChangeHandler = (text) => {
    setPasswordText(text);
  };

  // const [formState, dispatchFormState] = useReducer(formReducer, {
  //   inputValues: {
  //     email: "",
  //     password: "",
  //   },
  //   inputValidities: {
  //     email: false,
  //     password: false,
  //   },
  //   formIsValid: false,
  // });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const logInHandler = async () => {
    let action;
    action = authActions.login(emailText, passwordText);
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.replace("Home");
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
    setIsLoading(false);
  };

  // const inputChangeHandler = useCallback(
  //   (inputIdentifier, inputValue, inputValidity) => {
  //     dispatchFormState({
  //       type: FORM_INPUT_UPDATE,
  //       value: inputValue,
  //       isValid: inputValidity,
  //       input: inputIdentifier,
  //     });
  //   },
  //   [dispatchFormState]
  // );

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" animated={true} />
      <View style={styles.Header}>
        {/* <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="window-close"
            size={30}
            color={"#202020"}
            style={styles.closeIcon}
          />
        </TouchableOpacity> */}
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
        <Text style={styles.title}>Log In</Text>
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
          label="Password"
          value={passwordText}
          isPassword
          togglePassword={show}
          required
          maxLength={30}
          autoCapitalize="none"
          keyboardType="default"
          returnKeyType="send"
          errorText="Please enter a valid password"
          customShowPasswordImage={showPassword}
          customHidePasswordImage={hidePassword}
          onChangeText={passwordChangeHandler}
        />
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="rgba(0,0,0,0.7)"
          style={styles.btnBG}
          onPress={logInHandler}
        >
          <Text style={styles.btnText}>Log in</Text>
        </TouchableHighlight>
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

export default LoginScreen;
