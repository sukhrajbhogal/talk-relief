import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

import CardList from "../../components/CardList";
const FeedScreen = (props) => {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" animated={true} />
      <CardList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF1E4",
  },
});

export default FeedScreen;
