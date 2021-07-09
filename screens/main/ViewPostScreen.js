import React, { useState, useEffect, useLayoutEffect } from "react";
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
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";

import bg1 from "../../assets/bg.png";
import bg2 from "../../assets/bg2.png";
import bg3 from "../../assets/bg3.png";
import bg4 from "../../assets/bg4.png";
import bg5 from "../../assets/bg5.png";
import bg6 from "../../assets/bg6.png";
import bg7 from "../../assets/bg7.png";
import bg8 from "../../assets/bg8.png";
import bg9 from "../../assets/bg9.png";
import bg10 from "../../assets/bg10.png";

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

const { height } = Dimensions.get("window");
export const fullHeight = (height * 1564) / 974;

const ViewCardScreen = ({ navigation }) => {
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.mode = "mode";
    navigation.setOptions({
      headerTitleAlign: "center",
      headerBackTitle: "Back",
    });
  }, [navigation]);

  return (
    // Show card full screen as background
    <ImageBackground
      source={bgArray[route.params.Post.postPattern]}
      style={[
        styles.screen,
        { backgroundColor: colorArray[route.params.Post.postColor] },
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
                {route.params.Post.title}
              </Text>
              <Text
                numberOfLines={6}
                style={[styles.fontStyle, styles.cardContent]}
              >
                {route.params.Post.content}
              </Text>
            </View>
          </ScrollView>

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
};

export default ViewCardScreen;

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
    minWidth: 60,
    minHeight: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    fontWeight: "500",
  },
});
