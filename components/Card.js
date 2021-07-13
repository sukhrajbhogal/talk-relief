import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { database } from "../firebase";
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

//const blockedMessage = `${username} + " has been blocked`;
export const CARD_HEIGHT = (width * 1564) / 974;
const Card = ({
  docId,
  postId,
  username,
  creatorId,
  title,
  content,
  postPattern,
  postColor,
}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const userID = useSelector((state) => state.auth.userId);
  const displayName = useSelector((state) => state.auth.displayName);

  const blockUser = async () => {
    await database
      .collection("users")
      .doc(userID)
      .collection("blocked")
      .doc(creatorId)
      .set({
        blockedId: creatorId,
        blockedUserName: username,
      });
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
    Toast.show({
      text1: `${username} has been blocked`,
      visibilityTime: 1000,
      topOffset: 40,
      fontSize: 20,
      autoHide: true,
    });
  };

  const reportPost = async () => {
    await database.collection("reportedPosts").doc(postId).set({
      postId: postId,
      postTitle: title,
      reportedById: userID,
      reportedByUser: displayName,
      creatorId: creatorId,
    });
    await database
      .collection("cards")
      .doc(postId)
      .set({ flagged: true }, { merge: true });
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
    Toast.show({
      text1: `${username}'s post has been flagged`,
      visibilityTime: 1000,
      topOffset: 40,
      fontSize: 20,
      autoHide: true,
    });
  };

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
            numberOfLines={20}
            style={[styles.fontStyle, styles.cardContent]}
          >
            {content}
          </Text>
          <Text style={styles.fontStyle}>@{username}</Text>
        </View>

        {/* Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Report @{username}</Text>
              <Text style={styles.modalSubtitle}>We won't tell them.</Text>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "rgba(0,0,0,0.05)" : "white",
                  },
                  styles.rowContainer,
                ]}
                onPressIn={reportPost}
                onPressOut={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.modalText}>Report Post</Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={35}
                  color={"rgba(0,0,0,0.8)"}
                />
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "rgba(0,0,0,0.05)" : "white",
                  },
                  styles.rowContainer,
                ]}
                onPress={blockUser}
              >
                <Text style={styles.modalText}>Block User</Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={35}
                  color={"rgba(0,0,0,0.8)"}
                />
              </Pressable>
              {/* Cancel */}
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "rgba(0,0,0,0.05)" : "white",
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                  },
                  styles.cancelContainer,
                ]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.cancel}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Report button */}
        <View style={styles.report}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setModalVisible(true)}
          >
            <MaterialCommunityIcons
              name="flag-variant"
              size={35}
              color={"#202020"}
              style={styles.btnIcon}
            />
          </TouchableOpacity>
        </View>
        {/* Reply button */}
        <View style={styles.btnBG}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              navigation.push("View Card", {
                Card: {
                  docId,
                  creatorId,
                  username,
                  title,
                  content,
                  postPattern,
                  postColor,
                },
              })
            }
          >
            <MaterialCommunityIcons
              name="lead-pencil"
              size={35}
              color={"#202020"}
              style={styles.btnIcon}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
export default Card;

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
  report: {
    flexDirection: "row",
    backgroundColor: "white",
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 100,
    right: 20,
    borderRadius: 50,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOffset: { height: 5, width: 0 },
  },
  btnBG: {
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
  btnIcon: {
    top: 12,
    right: 12,
    bottom: 12,
    left: 12,
  },
  // Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "rgba(0,0,0,0.6)",
    marginTop: 10,
    marginBottom: 20,
  },
  rowContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 10,
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.10)",
  },
  modalText: {
    fontSize: 18,
    color: "rgba(0,0,0,0.8)",
    marginRight: "auto",
  },
  cancelContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.10)",
  },
  cancel: {
    fontSize: 20,
    color: "rgba(0,0,0,0.8)",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
