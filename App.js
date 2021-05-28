import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MainScreen from "./screens/MainScreen";
import CreatePostScreen from "./screens/CreatePostScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    Cocogoose: require("./assets/fonts/Cocogoose-Regular.ttf"),
  });
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
        initialRouteName="MainScreen"
        screenOptions={{
          headerTitleAlign: "left",
        }}
      >
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            title: "TalkRelief",
            headerStyle: {
              backgroundColor: "#FFF1E4",
            },
            headerTintColor: "#202020",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 24,
              fontFamily: "Cocogoose",
            },
          }}
        />
        <Stack.Screen name="Create Post" component={CreatePostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
