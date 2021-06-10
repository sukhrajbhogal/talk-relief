import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import PostForm from "../../components/PostForm";

const AddPostScreen = (props) => {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <PostForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#FFF1E4",
  },
});

export default AddPostScreen;
