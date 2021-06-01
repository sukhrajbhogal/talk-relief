import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as postAction from "../store/actions/posts";
import { useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [postTitleText, setPostTitle] = useState("");
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [postContentText, setPostContent] = useState("");
  const [contentIsValid, setContentIsValid] = useState(false);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const titleChangeHandler = (text) => {
    if (text.length === 0) {
      setTitleIsValid(false);
    } else {
      setTitleIsValid(true);
    }
    setPostTitle(text);
  };

  const contentChangeHandler = (text) => {
    if (text.length === 0) {
      setContentIsValid(false);
    } else {
      setContentIsValid(true);
    }
    setPostContent(text);
  };

  const submitHandler = useCallback(() => {
    dispatch(postAction.createPost(postTitleText, postContentText));
  }, []);

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Header}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="window-close"
            size={35}
            color={"#202020"}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log In</Text>

        <Button title="Log In" onPress={submitHandler}></Button>
      </View>
      <View style={styles.Message}>
        <View style={styles.titleContainer}>
          <Text>Email</Text>
          <TextInput
            style={styles.placeholder}
            id="title"
            name="title"
            keyboardType="default"
            placeholder="Abc@xyz.com"
            placeholderTextColor="#7B7670"
            value={postTitleText}
            onChangeText={titleChangeHandler}
          />
          {/* {!titleIsValid && <Text>Enter a Valid Title</Text>} */}
          {!titleIsValid}
        </View>
        <View style={styles.contentContainer}>
          <Text>Password</Text>
          <TextInput
            style={(styles.postContent, styles.placeholder)}
            id="content"
            name="content"
            multiline
            numberOfLines={10}
            keyboardType="default"
            placeholder="********"
            placeholderTextColor="#7B7670"
            value={postContentText}
            onChangeText={contentChangeHandler}
          />
          {!contentIsValid}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#FFF1E4",
    height: "100%",
  },
  Header: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.75,
    borderBottomColor: "#E8D7CC",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  Submit: {
    fontSize: 14,
    color: "#FF005C",
    fontWeight: "bold",
  },
  Message: {
    padding: 15,
  },
  titleContainer: {
    borderBottomWidth: 0.75,
    borderBottomColor: "#E8D7CC",
    paddingTop: 5,
    paddingBottom: 20,
  },
  contentContainer: {
    paddingTop: 15,
  },
  placeholder: {
    fontSize: 20,
  },
  postTitle: {
    fontSize: 60,
  },
  postContent: {
    height: "50%",
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
});

export default LoginScreen;
