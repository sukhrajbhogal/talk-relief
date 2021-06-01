import React, { useState, useCallback } from "react";
import { View, TextInput, Text, Button, StyleSheet } from "react-native";
import * as postAction from "../store/actions/posts";
import { useDispatch } from "react-redux";

const PostForm = () => {
  const [postTitleText, setPostTitle] = useState("");
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [postContentText, setPostContent] = useState("");
  const [contentIsValid, setContentIsValid] = useState(false);
  const dispatch = useDispatch();

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
    <View>
      <View style={styles.cardContainer}>
        <Text style={styles.postScreenTitle}>Create a Post</Text>
        <View style={styles.titleBox}>
          <Text>Title</Text>
          <TextInput
            style={styles.postTitle}
            id="title"
            name="title"
            keyboardType="default"
            placeholder="title"
            value={postTitleText}
            onChangeText={titleChangeHandler}
          />
          {!titleIsValid && <Text>Enter a Valid Title</Text>}
        </View>
        <View style={styles.contentBox}>
          <Text>Content</Text>
          <TextInput
            style={styles.postContent}
            id="content"
            name="content"
            multiline
            numberOfLines={10}
            keyboardType="default"
            placeholder="share your story"
            value={postContentText}
            onChangeText={contentChangeHandler}
          />
          {!contentIsValid && <Text>Enter Valid Content</Text>}
        </View>
        <View style={styles.button}>
          <Button title="Post" onPress={submitHandler} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: "100%",
  },
  cardContainer: {
    textAlign: "center",
    width: "100%",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowColor: "black",
    shadowOffset: { height: 5, width: 0 },
  },
  postScreenTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  titleBox: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  contentBox: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    textAlign: "left",
  },
  postTitle: {
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
  postContent: {
    height: "50%",
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
  button: {
    margin: 10,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "black",
  },
});

export default PostForm;
