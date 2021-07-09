import React, { useEffect, useLayoutEffect, useState } from "react";
import * as firebase from "firebase";
import { database } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

import {
  Text,
  ScrollView,
  View,
  SafeAreaView,
  StyleSheet,
  Button,
  TouchableHighlight,
  Linking,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import UserPostsList from "../../components/UserPostsList";

const ProfileScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState("");

  const postsRef = database.collection("users");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const value = await AsyncStorage.getItem("userData");
        if (value != null) {
          const uid = JSON.parse(value).userId;
          const username = JSON.parse(value).displayName;
          setDisplayName(username);
          getPosts(uid);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [dispatch]);

  const getPosts = async (uid) => {
    setIsLoading(true);
    const snapshot = await postsRef
      .doc(uid)
      .collection("posts")
      .where("creatorId", "==", uid)
      .orderBy("timestamp", "desc")
      .get();

    let userPosts = [];

    console.log("getPosts SIZE: " + snapshot.size);

    for (let i = 0; i < snapshot.size; i++) {
      userPosts.push(snapshot.docs[i].data());
      console.log(userPosts);
    }
    setPosts(userPosts);
    setIsLoading(false);
  };

  onRefresh = () => {
    getReplies();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
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
        <MaterialCommunityIcons
          name="cog"
          size={30}
          color={"#202020"}
          style={styles.closeIcon}
          onPress={() => navigation.navigate("Settings")}
        />
      </View>

      {/* <ScrollView style={styles.contentContainer}> */}
      <View style={styles.contentContainer}>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>{displayName}'s posts</Text>
          {/* <Text style={styles.content}>Your posts:</Text> */}
        </View>
      </View>
      {/* </ScrollView> */}
      {/* Display user posts */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.postId}
        renderItem={({ item }) => (
          <UserPostsList
            title={item.title}
            content={item.content}
            postPattern={item.cardPattern}
            postColor={item.cardColor}
          />
        )}
        // refreshControl={
        //   <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        // }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF1E4",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 15,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.75,
    borderBottomColor: "#E8D7CC",
  },
  usernameContainer: {
    padding: 15,
    borderBottomWidth: 0.75,
    borderBottomColor: "#E8D7CC",
  },
  username: {
    fontSize: 24,
    fontWeight: "700",
    // fontFamily: "Cocogoose",
  },
  content: {
    fontSize: 15,
  },
});

export default ProfileScreen;
