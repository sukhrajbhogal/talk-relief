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
  Pressable,
  Keyboard,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextInput } from "react-native";

const { height } = Dimensions.get("window");
export const fullHeight = (height * 1564) / 974;

export default function ViewCardScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [input, setInput] = useState("");
  const [isActive, setActive] = useState(false);

  const sendMessage = () => {
    Keyboard.dismiss();
    setInput("");
    // Code saves message to the database
  };

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
                <TouchableOpacity onPress={sendMessage} activeOpacity={0.3}>
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
              onChangeText={(text) => setInput(text)}
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
