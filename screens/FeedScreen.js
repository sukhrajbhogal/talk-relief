import React from "react";
import { View, Text, StyleSheet } from "react-native";

import CardList from "../components/CardList";

const FeedScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Feed Screen</Text>
      <CardList />
    </View>
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
