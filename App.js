import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "./screens/MainScreen";
import AddPostScreen from "./screens/AddPostScreen";
import InboxScreen from "./screens/InboxScreen";
import CardSectionScreen from "./screens/CardSectionScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    Cocogoose: require("./assets/fonts/Cocogoose-Regular.ttf"),
  });
};

const Stack = createStackNavigator();

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

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        //initialRouteName="Main"
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
          component={MainScreen}
          options={({ route }) => ({
            title: getHeaderTitle(route),
          })}
        />
        <Stack.Screen
          name="Add Post"
          component={AddPostScreen}
          options={({ route }) => ({
            title: getHeaderTitle(route),
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
}
