import React from "react";
import { View, Text, StyleSheet } from "react-native";

const InboxScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Inbox Screen</Text>
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

export default InboxScreen;
