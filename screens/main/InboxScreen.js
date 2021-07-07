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

import InboxList from "../../components/InboxList";

const InboxScreen = (props) => {
  const dispatch = useDispatch();
  let onEndReachedCalledDuringMomentum = false;

  const repliesRef = database.collection("users");
  const [replies, setReplies] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const value = await AsyncStorage.getItem("userData");
        if (value != null) {
          const uid = JSON.parse(value).userId;
          //console.log(uid);
          getReplies(uid);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [dispatch]);

  const getReplies = async (uid) => {
    setIsLoading(true);

    // DB grabs all replies
    const snapshot = await repliesRef
      .doc(uid)
      .collection("replies")
      // .where("creatorId", "==", uid)
      .orderBy("timestamp", "desc")
      .get();

    if (!snapshot.empty) {
      let inbox = [];

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      //console.log("getReplies SIZE: " + snapshot.size);

      for (let i = 0; i < snapshot.size; i++) {
        inbox.push(snapshot.docs[i].data());
        console.log(inbox);
      }
      setReplies(inbox);
    } else {
      // Stop if there are no more replies to load
      setLastDoc(null);
    }

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
          <InboxList
            username={item.replierUsername}
            title={item.postTitle}
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
