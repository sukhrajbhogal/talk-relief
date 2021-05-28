import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import FeedScreen from "./FeedScreen";
import CreatePostScreen from "./CreatePostScreen";
import InboxScreen from "./InboxScreen";

const Tab = createBottomTabNavigator();

export class Main extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: "#FF005C",
          inactiveTintColor: "#202020",
          showLabel: false,
          style: { backgroundColor: "#FFF1E4" },
        }}
      >
        <Tab.Screen
          name="FeedScreen"
          component={FeedScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size, style }) => (
              <MaterialCommunityIcons
                name="home"
                color={color}
                size={40}
                style={{ height: 40, margin: -10 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="CreatePostScreen"
          component={CreatePostScreen}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("CreatePostScreen");
            },
          })}
          options={{
            tabBarLabel: "Create Post",
            tabBarIcon: ({ color, size, style }) => (
              <MaterialCommunityIcons
                name="plus-circle"
                color={color}
                size={40}
                style={{ height: 40, margin: -10 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="InboxScreen"
          component={InboxScreen}
          options={{
            tabBarLabel: "Letters",
            tabBarIcon: ({ color, size, style }) => (
              <MaterialCommunityIcons
                name="email"
                color={color}
                size={40}
                style={{ height: 40, margin: -10 }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default Main;
