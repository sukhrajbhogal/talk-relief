import React from "react";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import TabNavigation from "./TabNavigation";
import AddPostScreen from "../screens/AddPostScreen";
import InboxScreen from "../screens/InboxScreen";
import CardSectionScreen from "../screens/CardSectionScreen";

const Stack = createStackNavigator();

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
        //initialRouteName=""
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
          })}
        />
        <Stack.Screen
          name="CardSection"
          component={CardSectionScreen}
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
