import React from "react";
import { SafeAreaView, StatusBar, Text, StyleSheet } from "react-native";
import PostForm from "../components/PostForm";

const AddPostScreen = (props) => {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <Text>Add Post Screen</Text>
      <PostForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#FFF1E4",
  },
});

export default AddPostScreen;
