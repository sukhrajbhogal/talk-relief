import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import * as firebase from "firebase";
import "firebase/firestore";

import { database } from "../../firebase";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";

import CustomListItem from "../../components/CustomListItem";

const InboxScreen = (props) => {
  const dispatch = useDispatch();

  const repliesRef = database.collection("users");
  const [replies, setReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const value = await AsyncStorage.getItem("userData");
        if (value != null) {
          const uid = JSON.parse(value).userId;
          console.log(uid);
          getReplies(uid);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
    console.log("REPLIES CONSTANT:");
    console.log(replies);
    console.log("^^REPLIES CONSTANT^^");
  }, [dispatch]);

  const getReplies = async (uid) => {
    setIsLoading(true);
    const snapshot = await repliesRef
      .doc(uid)
      .collection("replies")
      .where("creatorId", "==", uid)
      .orderBy("timestamp", "desc")
      .get();

    let inbox = [];

    console.log("getReplies SIZE: " + snapshot.size);

    for (let i = 0; i < snapshot.size; i++) {
      inbox.push(snapshot.docs[i].data());
      console.log(inbox);
    }
    setReplies(inbox);

    setIsLoading(false);
  };

  onRefresh = () => {
    getReplies();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={replies}
        keyExtractor={(item) => item.replyId}
        renderItem={({ item }) => (
          <CustomListItem
            username={item.replierUsername}
            content={item.replyContent}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF1E4",
  },
});

export default InboxScreen;
