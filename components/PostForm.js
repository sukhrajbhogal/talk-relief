import React, { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import * as postActions from "../store/actions/posts";
import { useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import { auth, database } from "../firebase";

const PostForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [error, setError] = useState();
  const [postTitleText, setPostTitle] = useState("");
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [postContentText, setPostContent] = useState("");
  const [contentIsValid, setContentIsValid] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [userId, setUserId] = useState("");

  // const user = auth.currentUser;
  // console.log(user);
  // setDisplayName(user.displayName);
  // setUserId(user.uid);

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       console.log(user);
  //     } else {
  //       console.log("current user is null");
  //     }
  //   });
  // });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const value = await AsyncStorage.getItem("userData");
        if (value != null) {
          const username = JSON.parse(value).displayName;
          const uid = JSON.parse(value).userId;
          console.log(username);
          setDisplayName(username);
          setUserId(uid);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [dispatch]);

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

  const createPost = () => {
    if (contentIsValid === false || titleIsValid === false) {
      setError("The title or story is empty!");
    }
    database
      .collection("cards")
      .add({
        title: postTitleText,
        content: postContentText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: displayName,
        creatorId: userId,
      })
      .then(() => {
        console.log(title, content);
        props.navigation.navigate("Home");
      });
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  // const submitHandler = useCallback(() => {
  //   dispatch(postActions.createPost(postTitleText, postContentText));
  // }, []);

  return (
    <View>
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
        <Text style={styles.headerTitle}>Create Post</Text>

        <Pressable onPressOut={createPost}>
          <Button title="POST" onPress={createPost} />
          {/* <TouchableOpacity>
            <Text style={styles.Submit}>POST</Text>
          </TouchableOpacity> */}
        </Pressable>
      </View>
      <View style={styles.Container}>
        <View style={styles.titleContainer}>
          <TextInput
            style={(styles.placeholder, { fontWeight: "600", fontSize: 20 })}
            id="title"
            name="title"
            keyboardType="default"
            placeholder="Post title"
            placeholderTextColor="#7B7670"
            value={postTitleText}
            onChangeText={titleChangeHandler}
          />
          {/* {!titleIsValid && <Text>Enter a Valid Title</Text>} */}
          {!titleIsValid}
        </View>
        <View style={styles.contentContainer}>
          <TextInput
            style={(styles.postContent, styles.placeholder)}
            id="content"
            name="content"
            multiline
            numberOfLines={10}
            keyboardType="default"
            placeholder="What's on your mind?"
            placeholderTextColor="#7B7670"
            value={postContentText}
            onChangeText={contentChangeHandler}
          />
          {!contentIsValid}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  Container: {
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

export default PostForm;
