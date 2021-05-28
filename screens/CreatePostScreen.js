import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CreatePostScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Create Post Screen</Text>
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

export default CreatePostScreen;
