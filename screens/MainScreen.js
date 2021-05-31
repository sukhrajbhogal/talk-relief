import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import FeedScreen from "./FeedScreen";
import AddPostScreen from "./AddPostScreen";
import InboxScreen from "./InboxScreen";

const Tab = createBottomTabNavigator();

export class Main extends Component {
  render() {
    return (
      <Tab.Navigator
        //initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: "#FF005C",
          inactiveTintColor: "#202020",
          showLabel: false,
          style: {
            backgroundColor: "#FFF1E4",
            paddingLeft: 40,
            paddingRight: 40,
          },
        }}
      >
        <Tab.Screen
          name="Home"
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
          name="Add Post"
          component={AddPostScreen}
          options={{
            tabBarLabel: "Add Post",
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
          name="Inbox"
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
