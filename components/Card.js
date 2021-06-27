import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//import { bgArray, colorArray } from "../models/bgAndColor";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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
export const bgArray = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10];
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

const { width } = Dimensions.get("window");
export const CARD_HEIGHT = (width * 1564) / 974;
const Card = ({
  docId,
  username,
  creatorId,
  userId,
  title,
  content,
  postPattern,
  postColor,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={1}
      // Send card info to CardSectionScreen which displays the card full screen
      onPress={() =>
        navigation.push("View Card", {
          Card: {
            docId,
            creatorId,
            username,
            userId,
            title,
            content,
            postPattern,
            postColor,
          },
        })
      }
    >
      <ImageBackground
        source={bgArray[postPattern]}
        style={[styles.bgImage, { backgroundColor: colorArray[postColor] }]}
      >
        <View style={styles.cardStyle}>
          <Text style={[styles.fontStyle, styles.cardTitle]}>{title}</Text>
          <Text
            numberOfLines={6}
            style={[styles.fontStyle, styles.cardContent]}
          >
            {content}
          </Text>
          <Text style={styles.fontStyle}>@{username}</Text>
        </View>
        <View style={styles.replyBG}>
          <TouchableOpacity activeOpacity={0.5}>
            <MaterialCommunityIcons
              name="lead-pencil"
              size={35}
              color={"#202020"}
              style={styles.replyIcon}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    textAlign: "center",
    width: "90%",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowColor: "black",
    shadowOffset: { height: 5, width: 0 },
  },
  bgImage: {
    height: CARD_HEIGHT,
    paddingTop: "20%",
    overflow: "hidden",
    borderRadius: 25,
    marginTop: "3%",
    marginBottom: "3%",
  },
  cardStyle: {
    padding: 20,
  },
  fontStyle: {
    color: "#fff",
    fontSize: 20,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  cardContent: {
    marginTop: "7%",
    marginBottom: "7%",
    lineHeight: 30,
  },
  replyBG: {
    flexDirection: "row",
    backgroundColor: "white",
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 50,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOffset: { height: 5, width: 0 },
  },
  replyIcon: {
    top: 12,
    right: 12,
    bottom: 12,
    left: 12,
  },
});

export default Card;
