import React, { useState, useCallback, useEffect, useReducer } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import * as authActions from "../../store/actions/auth";

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
  const dispatch = useDispatch();

  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  //const [error, setError] = useState();
  //const dispatch = useDispatch();

  const emailChangeHandler = (text) => {
    setEmailText(text);
  };

  const passwordChangeHandler = (text) => {
    setPasswordText(text);
  };

  const navigation = useNavigation();
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

  const logInHandler = () => {
    let action;
    action = authActions.login(emailText, passwordText);
    try {
      dispatch(action);
      props.navigation.navigate("Home");
    } catch (err) {
      setError(err.message);
    }
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
    <SafeAreaView style={styles.Container}>
      <View style={styles.Header}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="window-close"
            size={35}
            color={"#202020"}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log In</Text>

        <Button title="Log In" onPress={logInHandler}></Button>
      </View>
      <View style={styles.Message}>
        <View style={styles.titleContainer}>
          <Text>Email</Text>
          <TextInput
            style={styles.placeholder}
            id="email"
            name="E-Mail"
            required
            value={emailText}
            keyboardType="email-address"
            autoCapitalize="none"
            errorText="Please enter a valid email address"
            placeholder="Abc@xyz.com"
            placeholderTextColor="#7B7670"
            onChangeText={emailChangeHandler}
            //onChangeText={inputChangeHandler}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text>Password</Text>
          <TextInput
            style={(styles.postContent, styles.placeholder)}
            id="password"
            name="Password"
            secureTextEntry={true}
            required
            value={passwordText}
            minLength={6}
            errorText="Please enter a valid password"
            autoCapitalize="none"
            keyboardType="default"
            placeholder="********"
            placeholderTextColor="#7B7670"
            onChangeText={passwordChangeHandler}
            //onChangeText={inputChangeHandler}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#FFF1E4",
    height: "100%",
  },
  Header: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.75,
    borderBottomColor: "#E8D7CC",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  Submit: {
    fontSize: 14,
    color: "#FF005C",
    fontWeight: "bold",
  },
  Message: {
    padding: 15,
  },
  titleContainer: {
    borderBottomWidth: 0.75,
    borderBottomColor: "#E8D7CC",
    paddingTop: 5,
    paddingBottom: 20,
  },
  contentContainer: {
    paddingTop: 15,
  },
  placeholder: {
    fontSize: 20,
  },
  postTitle: {
    fontSize: 60,
  },
  postContent: {
    height: "50%",
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
});

export default LoginScreen;
