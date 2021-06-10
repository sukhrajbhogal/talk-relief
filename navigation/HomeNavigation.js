import React from "react";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import TabNavigation from "./TabNavigation";
import AuthScreen from "../screens/auth/AuthScreen";
import AddPostScreen from "../screens/main/AddPostScreen";
import InboxScreen from "../screens/main/InboxScreen";
import ViewCardScreen from "../screens/main/ViewCardScreen";
import ViewLetterScreen from "../screens/main/ViewLetterScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignUpScreen";
import ProfileScreen from "../screens/auth/ProfileScreen";
import StartUpScreen from "../screens/auth/StartUpScreen";

import horizontalAnimation from "../components/horizontalAnimation";

import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();
const InboxStack = createStackNavigator();
const PostStack = createStackNavigator();
const FeedStack = createStackNavigator();
const AuthStackNavigation = createStackNavigator();

// Changes header title when users navigation between tabs
function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return "TalkRelief";
    case "Add Post":
      return "What's on your mind?";
    case "Inbox":
      return "Letters for you";
  }
}

export const AuthNavigation = () => {
  return (
    <AuthStackNavigation.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigation.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigation.Navigator>
  );
};

const HomeNavigation = () => {
  //const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="StartUp"
      mode="modal"
      screenOptions={{
        headerTitleAlign: "left",
        headerStyle: {
          backgroundColor: "#FFF1E4",
        },
        headerTintColor: "#202020",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
          fontFamily: "Cocogoose",
        },
      }}
    >
      <Stack.Screen
        name="StartUp"
        component={StartUpScreen}
        options={({ route }) => ({
          title: getHeaderTitle(route),
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={({ route }) => ({
          title: getHeaderTitle(route),
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({ route }) => ({
          title: getHeaderTitle(route),
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={({ route }) => ({
          title: getHeaderTitle(route),
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Home"
        component={TabNavigation}
        options={({ navigation, route }) => ({
          title: getHeaderTitle(route),
          headerRight: () => (
            <MaterialCommunityIcons
              name="account-circle"
              size={35}
              color="#202020"
              style={{ right: 15 }}
              onPress={() => navigation.navigate("Profile")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Add Post"
        component={AddPostScreen}
        options={({ route }) => ({
          title: getHeaderTitle(route),
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Inbox"
        component={InboxScreen}
        options={({ route }) => ({
          title: getHeaderTitle(route),
          headerShown: false,
        })}
      />
      <InboxStack.Screen
        name="View Letter"
        component={ViewLetterScreen}
        options={({ route }) => ({
          title: getHeaderTitle(route),
        })}
        options={horizontalAnimation}
      />
      <Stack.Screen
        name="View Card"
        component={ViewCardScreen}
        options={({ route }) => ({
          title: getHeaderTitle(route),
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route }) => ({
          title: getHeaderTitle(route),
          headerShown: false,
        })}
        options={horizontalAnimation}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
