import React from "react";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import TabNavigation from "./TabNavigation";
import SplashScreen from "../screens/SplashScreen";
import AddPostScreen from "../screens/AddPostScreen";
import InboxScreen from "../screens/InboxScreen";
import ViewCardScreen from "../screens/ViewCardScreen";
import ViewLetterScreen from "../screens/ViewLetterScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignUpScreen";
import horizontalAnimation from "../components/horizontalAnimation";

const Stack = createStackNavigator();
const InboxStack = createStackNavigator();

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

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
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
          name="Splash"
          component={SplashScreen}
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
          options={({ route }) => ({
            title: getHeaderTitle(route),
            headerRight: () => (
              <MaterialCommunityIcons
                name="account-circle"
                size={35}
                color="#202020"
                style={{ right: 15 }}
                onPress={() => alert("Click this to logout.")}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
