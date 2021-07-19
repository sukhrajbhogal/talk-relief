import React, { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as postActions from "../store/actions/posts";
import { useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import { auth, database } from "../firebase";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import bg1 from "../assets/bg.png";
import bg2 from "../assets/bg2.png";
import bg3 from "../assets/bg3.png";
import bg4 from "../assets/bg4.png";
import bg5 from "../assets/bg5.png";
import bg6 from "../assets/bg6.png";
import bg7 from "../assets/bg7.png";
import bg8 from "../assets/bg8.png";
import bg9 from "../assets/bg9.png";
import bg10 from "../assets/bg10.png";

const colorArray = [
  "#C83E6F",
  "#FF6B00",
  "#0085FF",
  "#128200",
  "#008272",
  "#6e7582",
  "#7A78DF",
  "#F08EEC",
  "#194350",
  "#1FAB4F",
  "#1F46AB",
  "#AB1F1F",
  "#51C4D3",
];

const bgArray = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10];

const PostForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [postTitleText, setPostTitle] = useState("");
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [postContentText, setPostContent] = useState("");
  const [contentIsValid, setContentIsValid] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [userId, setUserId] = useState("");

  let docId;

  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return;
        }
      });
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const value = await AsyncStorage.getItem("userData");
        if (value != null) {
          const username = JSON.parse(value).displayName;
          const uid = JSON.parse(value).userId;
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

  const createPost = async () => {
    setIsLoading(true);
    if (contentIsValid === false || titleIsValid === false) {
      setError("The title or story is empty!");
    } else {
      let pushToken;
      let statusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      if (statusObj.status !== "granted") {
        statusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      }
      if (statusObj.status !== "granted") {
        pushToken = null;
      } else {
        pushToken = (await Notifications.getExpoPushTokenAsync()).data;
      }
      const randomIndex = Math.floor(Math.random() * bgArray.length);
      const randomColorIndex = Math.floor(Math.random() * colorArray.length);
      await database
        .collection("cards")
        .add({
          title: postTitleText,
          content: postContentText,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          username: displayName,
          creatorId: userId,
          cardPattern: randomIndex,
          cardColor: randomColorIndex,
          flagged: false,
          pushToken: pushToken,
        })
        .then((post) => {
          console.log("Document written with ID: ", post.id);
          docId = post.id;
          database.collection("cards").doc(post.id).set(
            {
              postId: docId,
            },
            { merge: true }
          );
        })
        .then((post) => {
          database
            .collection("users")
            .doc(userId)
            .collection("posts")
            .doc(docId)
            .set({
              title: postTitleText,
              postId: docId,
              content: postContentText,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              username: displayName,
              creatorId: userId,
              cardPattern: randomIndex,
              cardColor: randomColorIndex,
            });
          console.log("SUCCESS");
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });

          // Creates a 2 second toast notification when post is submitted
          Toast.show({
            text1: "Your post was created! 😊",
            visibilityTime: 1000,
            topOffset: 40,
            autoHide: true,
          });
        });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

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

        {/* Post button */}
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="rgba(0,0,0,0.7)"
          style={styles.submit}
          onPress={createPost}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.submitText}>Post</Text>
          )}
        </TouchableHighlight>

        {/* <Button title="POST" onPress={createPost} /> */}
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
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.75,
    borderBottomColor: "#E8D7CC",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
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
  submit: {
    marginRight: 5,
    backgroundColor: "#202020",
    borderRadius: 20,
    minWidth: 60,
    minHeight: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "500",
  },
});

export default PostForm;
