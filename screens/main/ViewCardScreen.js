import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase";
import { database } from "../../firebase";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import {
  SafeAreaView,
  ScrollView,
  View,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
  Alert
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextInput } from "react-native";

const { height } = Dimensions.get("window");
export const fullHeight = (height * 1564) / 974;

export default function ViewCardScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const [error, setError] = useState();
  const [input, setInput] = useState("");
  const [inputIsValid, setInputIsValid] = useState(false);
  const [isActive, setActive] = useState(false);
  const [userIdCollection, setUserIdCollection] = useState("");
  const [replierUserName, setReplierUserName] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const value = await AsyncStorage.getItem("userData");
        if (value != null) {
          const username = JSON.parse(value).displayName;
          const uid = JSON.parse(value).userId;
          setReplierUserName(username);
          setUserIdCollection(uid);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [dispatch]);

  const inputChangeHandler = (text) => {
    if (text.length === 0) {
      setInputIsValid(false);
    } else {
      setInputIsValid(true);
    }
    setInput(text);
  };

  const sendReply = () => {
    if (inputIsValid === false) {
      setError("The title or story is empty!");
    } else {
      database
        .collection("users")
        .doc(route.params.Card.creatorId)
        .collection("replies")
        .add({
          replyContent: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          replierUsername: replierUserName,
          replierId: userIdCollection,
          creatorId: route.params.Card.creatorId,
        })
        .then((reply) => {
          replyId = reply.id
          database.collection("users").doc(route.params.Card.creatorId).collection("replies").doc(replyId).set({
            replyId: replyId,
          }, {merge: true})
          navigation.navigate("Home");

          // Creates a 3 second toast notification when post is submitted
          Toast.show({
            text1: "Your reply was sent. 😊",
            visibilityTime: 2000,
            topOffset: 50,
            autoHide: true,
            fontSize: 20,
          });
        });
    }
    Keyboard.dismiss();
    setInput("");
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);


  const cancelMessage = () => {
    Keyboard.dismiss();
    setInput("");
  };

  let numOfLines = 0;

  return (
    // Show card full screen as background
    <ImageBackground
      source={route.params.Card.selectedBG}
      style={[
        styles.screen,
        { backgroundColor: route.params.Card.selectedColor },
      ]}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" animated={false} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
          //keyboardVerticalOffset={90}
        >
          {/* Card goes here */}
          <ScrollView style={styles.cardContainer}>
            <View>
              <Text style={[styles.fontStyle, styles.cardTitle]}>
                {route.params.Card.title}
              </Text>
              <Text
                numberOfLines={6}
                style={[styles.fontStyle, styles.cardContent]}
              >
                {route.params.Card.content}
              </Text>
              <Text style={styles.fontStyle}>
                @{route.params.Card.username}
              </Text>
              <Text style={styles.fontStyle}>
                {route.params.Card.creatorId}
              </Text>
            </View>
          </ScrollView>

          {/* Write a reply */}
          <View style={styles.replyContainer}>
            <View style={styles.replyHeader}>
              {/* Close reply */}
              <TouchableOpacity activeOpacity={0.5} onPress={cancelMessage}>
                <MaterialCommunityIcons
                  name="window-close"
                  size={30}
                  color={"#fff"}
                />
              </TouchableOpacity>
              <Text style={styles.posterName}>
                Replying to @{route.params.Card.username}
              </Text>

              {/* Send button */}
              <Pressable style={styles.submit}>
                <TouchableOpacity onPress={sendReply} activeOpacity={0.3}>
                  <Text>Send</Text>
                </TouchableOpacity>
              </Pressable>
            </View>

            {/* Input */}
            <TextInput
              style={{
                color: "#fff",
                fontSize: 16,
                marginLeft: 15,
                marginRight: 15,
                minHeight: isActive ? 120 : 40,
                maxHeight: isActive ? 140 : 120,
                marginBottom: isActive ? 10 : 0,
              }}
              value={input}
              multiline={true}
              numberOfLines={numOfLines}
              onContentSizeChange={(e) => {
                numOfLines = e.nativeEvent.contentSize.height / 16;
              }}
              onFocus={() => setActive(true)}
              onBlur={() => setActive(false)}
              onChangeText={inputChangeHandler}
              placeholder="Write kind words"
              placeholderTextColor="rgba(255,255,255,0.5)"
            />
          </View>

          {/* Close Button */}
          <View style={styles.closeButtonBG}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.goBack()}
            >
              <MaterialCommunityIcons
                name="window-close"
                size={24}
                color={"#202020"}
                style={styles.closeButtonIcon}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {/* Bottom Safe Area */}
      <SafeAreaView
        style={{ flex: 0, backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  fontStyle: {
    color: "#fff",
    fontSize: 20,
  },
  cardContainer: {
    padding: 20,
  },
  cardTitle: {
    paddingTop: "12%",
    fontWeight: "bold",
    fontSize: 24,
  },
  cardContent: {
    marginTop: "7%",
    marginBottom: "7%",
    lineHeight: 30,
  },
  closeButtonBG: {
    alignItems: "flex-start",
    flexDirection: "row",
    backgroundColor: "white",
    position: "absolute",
    width: 30,
    height: 30,
    top: 20,
    right: 20,
    borderRadius: 50,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOffset: { height: 5, width: 0 },
  },
  closeButtonIcon: {
    top: 3,
    right: 3,
    bottom: 3,
    left: 3,
  },
  replyContainer: {
    width: "100%",
    padding: 5,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  replyHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    alignItems: "center",
    marginBottom: 5,
  },
  posterName: {
    color: "#fff",
    marginLeft: 10,
    marginRight: "auto",
  },
  submit: {
    marginRight: 5,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
