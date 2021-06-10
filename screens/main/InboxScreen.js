import React from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";

import CustomListItem from "../../components/CustomListItem";

// Dummy Data
const Messages = [
  {
    id: 1,
    username: "David",
    Title: "Everything will be ok",
    Content:
      "It’s ok. Whatever the tough thing is, it’s ok. It’s ok that you feel like you don’t know how to handle it. You will be ok.",
  },
];

const InboxScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF1E4",
  },
});

export default InboxScreen;
