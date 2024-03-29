import React, { useState, useEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import TabNavigation from "./TabNavigation";
import AuthScreen from "../screens/auth/AuthScreen";
import AddPostScreen from "../screens/main/AddPostScreen";
import InboxScreen from "../screens/main/InboxScreen";
import ViewCardScreen from "../screens/main/ViewCardScreen";
import ViewLetterScreen from "../screens/main/ViewLetterScreen";
import ViewPostScreen from "../screens/main/ViewPostScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignUpScreen";
import StartUpScreen from "../screens/auth/StartUpScreen";
import ProfileScreen from "../screens/auth/ProfileScreen";
import SettingsScreen from "../screens/auth/SettingsScreen";
import OnboardingScreen from "../screens/auth/OnboardingScreen";

import horizontalAnimation from "../components/horizontalAnimation";

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();

// Show a different header title on different screens
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
    <AuthStack.Navigator
      // initialRouteName=""
      mode="modal"
    >
      <AuthStack.Screen
        name="Auth"
        component={AuthScreen}
        options={({ route }) => ({
          title: getHeaderTitle(route),
          headerShown: false,
        })}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={({ route }) => ({
          title: getHeaderTitle(route),
          headerShown: false,
        })}
      />
      <AuthStack.Screen
        name="Signup"
        component={SignupScreen}
        options={({ route }) => ({
          title: getHeaderTitle(route),
          headerShown: false,
        })}
      />
      <AuthStack.Screen
        name="StartUp"
        component={StartUpScreen}
        options={({ route }) => ({
          title: getHeaderTitle(route),
          headerShown: false,
        })}
      />
    </AuthStack.Navigator>
  );
};

export const HomeNavigation = () => {
  return (
    <HomeStack.Navigator
      // initialRouteName=""
      mode="modal"
      screenOptions={{
        headerTitleAlign: "left",
        headerStyle: {
          backgroundColor: "#FFF1E4",
        },
        headerTintColor: "#202020",

        // Logo
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
          fontFamily: "Cocogoose",
        },
      }}
    >
      <HomeStack.Screen
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
      <HomeStack.Screen
        name="Add Post"
        component={AddPostScreen}
        options={({ route }) => ({
          title: getHeaderTitle(route),
          headerShown: false,
        })}
      />
      <HomeStack.Screen
        name="Inbox"
        component={InboxScreen}
        options={({ route }) => ({
          title: getHeaderTitle(route),
          headerShown: false,
        })}
      />
      <HomeStack.Screen
        name="View Letter"
        component={ViewLetterScreen}
        options={({ route }) => ({
          title: getHeaderTitle(route),
        })}
        options={horizontalAnimation}
      />
      <HomeStack.Screen
        name="View Card"
        component={ViewCardScreen}
        options={({ route }) => ({
          title: getHeaderTitle(route),
          headerShown: false,
        })}
      />
      <HomeStack.Screen
        name="View Post"
        component={ViewPostScreen}
        options={({ route }) => ({
          title: getHeaderTitle(route),
          headerShown: false,
        })}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={horizontalAnimation}
      />
      {/* <HomeStack.Screen
        name="Your Posts"
        component={UsersPostsScreen}
        options={({ route }) => ({
          title: getHeaderTitle(route),
          // headerShown: false,
        })}
        options={horizontalAnimation}
      /> */}
      <HomeStack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};
