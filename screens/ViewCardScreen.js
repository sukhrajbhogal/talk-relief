import React, { useState } from "react";
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
  Button,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import AutoExpandingTextInput from "../components/AutoExpandingTextInput";
import { TextInput } from "react-native";

const { height } = Dimensions.get("window");
export const fullHeight = (height * 1564) / 974;

export default function ViewCardScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [input, setInput] = useState("");

  const sendMessage = () => {};
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
                {route.params.Card.Title}
              </Text>
              <Text
                numberOfLines={6}
                style={[styles.fontStyle, styles.cardContent]}
              >
                {route.params.Card.Content}
              </Text>
              <Text style={styles.fontStyle}>
                @{route.params.Card.username}
              </Text>
            </View>
          </ScrollView>

          {/* Write a reply */}
          <View style={styles.replyContainer}>
            <TextInput
              style={styles.textInput}
              value={input}
              multiline={true}
              numberOfLines={numOfLines}
              onChangeText={(text) => setInput(text)}
              placeholder="Write kind words"
              placeholderTextColor="rgba(55,55,55,0.7)"
            />
            <TouchableOpacity onPress={sendMessage} activeOpacity={0.7}>
              <Button title="SEND"></Button>
            </TouchableOpacity>
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
      <SafeAreaView style={{ flex: 0, backgroundColor: "#fff" }} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  replyContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 15,
    alignItems: "center",
    backgroundColor: "#fff",
    // backgroundColor: "rgba(52, 52, 52, 0.8)",
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
  },
  // textInput: {
  //   bottom: 0,
  //   height: 40,
  //   flex: 1,
  //   marginRight: 15,
  //   padding: 10,
  //   color: "#fff",
  //   fontSize: 16,
  // },
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 5,
    padding: 10,
    paddingTop: 10,
    backgroundColor: "#D7D9DD",
    borderRadius: 20,
    color: "#202020",
    fontSize: 16,
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
    top: 40,
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
});
