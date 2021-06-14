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
    username: "Pastaccine",
    Title: "How do you comfort a friend who’s super sad? :(",
    Content:
      "When comforting someone, I try to focus on making them feel safe first. Treat them to a snack they like, turn on music they enjoy, watch something familiar, etc. There’s huge comfort in safety and even if it’s just temporarily distracting them, it’ll mean a lot to them!",
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
