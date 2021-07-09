import React, { useState, useCallback, useReducer } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import * as authActions from "../../store/actions/auth";
import { useAnimatedScrollHandler } from "react-native-reanimated";

const SignUpScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [userNameText, setUserNameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const userNameChangeHandler = (text) => {
    setUserNameText(text);
  };
  const emailChangeHandler = (text) => {
    setEmailText(text);
  };

  const passwordChangeHandler = (text) => {
    setPasswordText(text);
  };

  const signUpHandler = async () => {
    setIsLoading(true);
    dispatch(authActions.signup(userNameText, emailText, passwordText));
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar barStyle="dark-content" animated={true} />
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
        <Text style={styles.headerTitle}>Sign Up</Text>

        <Button title="Sign Up" onPress={signUpHandler}></Button>
      </View>
      <View style={styles.Message}>
        <View style={styles.titleContainer}>
          <Text>Username</Text>
          <TextInput
            style={styles.placeholder}
            id="username"
            name="username"
            value={userNameText}
            required
            keyboardType="default"
            autoCapitalize="none"
            errorText="Please enter a valid username"
            placeholder="username"
            placeholderTextColor="#7B7670"
            onChangeText={userNameChangeHandler}
          />
          {/* {!titleIsValid && <Text>Enter a Valid Title</Text>} */}
        </View>
        <View style={styles.titleContainer}>
          <Text>Email</Text>
          <TextInput
            style={styles.placeholder}
            id="email"
            name="email"
            value={emailText}
            required
            keyboardType="email-address"
            autoCapitalize="none"
            errorText="Please enter a valid email address"
            placeholder="Abc@xyz.com"
            placeholderTextColor="#7B7670"
            onChangeText={emailChangeHandler}
          />
          {/* {!titleIsValid && <Text>Enter a Valid Title</Text>} */}
        </View>
        <View style={styles.contentContainer}>
          <Text>Password</Text>
          <TextInput
            style={(styles.postContent, styles.placeholder)}
            id="password"
            name="password"
            value={passwordText}
            secureTextEntry={true}
            required
            numberOfLines={10}
            errorText="Please enter a valid password"
            autoCapitalize="none"
            keyboardType="default"
            placeholder="********"
            placeholderTextColor="#7B7670"
            onChangeText={passwordChangeHandler}
          />
        </View>
        {isLoading ? <ActivityIndicator size="large" /> : <View />}
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

export default SignUpScreen;
