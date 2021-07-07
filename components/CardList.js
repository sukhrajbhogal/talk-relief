import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { FlatList } from "react-native-gesture-handler";
import { database } from "../firebase";
import { useNavigation } from "@react-navigation/native";

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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Card from "./Card";
import { block } from "react-native-reanimated";

const { width } = Dimensions.get("window");
export const CARD_HEIGHT = (width * 1564) / 974;

// Card Pattern and Color arrays
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

const CardList = () => {
  let onEndReachedCalledDuringMomentum = false;

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const cardsRef = database.collection("cards");
  const userRef = database.collection("users");
  const userID = useSelector((state) => state.auth.userId);
  const [lastDoc, setLastDoc] = useState(null);
  const [cards, setCards] = useState([]);
  //const [blockedUsers, setBlockedUsers] = useState(["i"]);

  let blockedArray = [];

  useEffect(() => {
    getCards();
    //getBlockedList();
  }, []);

  const getBlockedList = async () => {
    console.log("getting blocked users");
    const snapshot = await database
      .collection("users")
      .doc(userID)
      .collection("blocked")
      .get();

    // for (let n = 0; n < cards.length; n++) {
    //   if (cards[n].creatorId) console.log("creator: " + cards[n].creatorId);
    // }
  };
  // Load cards from database
  getCards = async () => {
    setIsLoading(true);
    //console.log(blockedUsers);

    // Database grabs the next 7 cards (older)
    const cardSnapshot = await cardsRef
      .orderBy("timestamp", "desc")
      .limit(7)
      .get();

    const blockedSnapshot = await userRef
      .doc(userID)
      .collection("blocked")
      .get();

    if (!blockedSnapshot.empty) {
      console.log(blockedSnapshot.size);

      for (let i = 0; i < blockedSnapshot.docs.length; i++) {
        blockedArray.push(blockedSnapshot.docs[i].id);
      }
      console.log("BLOCKED LIST: " + blockedArray);
    }
    // Show the next 7 cards if there are more available
    if (!cardSnapshot.empty) {
      let newCards = [];

      setLastDoc(cardSnapshot.docs[cardSnapshot.docs.length - 1]);

      for (let i = 0; i < cardSnapshot.docs.length; i++) {
        console.log(
          "post creator id: " + cardSnapshot.docs[i].data().creatorId
        );
        console.log(
          "blocked: " +
            blockedArray.includes(cardSnapshot.docs[i].data().creatorId)
        );
        if (
          blockedArray.includes(cardSnapshot.docs[i].data().creatorId) === false
        ) {
          newCards.push(cardSnapshot.docs[i].data());
        }
      }

      setCards(newCards);
    } else {
      // Stop if no cards are left
      setLastDoc(null);
    }

    setIsLoading(false);
  };

  // Load more cards once user is near the end
  getMore = async () => {
    if (lastDoc) {
      setIsMoreLoading(true);

      const blockedSnapshot = await userRef
        .doc(userID)
        .collection("blocked")
        .get();

      if (!blockedSnapshot.empty) {
        console.log(blockedSnapshot.size);

        for (let i = 0; i < blockedSnapshot.docs.length; i++) {
          blockedArray.push(blockedSnapshot.docs[i].id);
        }
      }

      // Stop loading after a certain amount of time passes
      setTimeout(async () => {
        let snapshot = await cardsRef
          .orderBy("timestamp", "desc")
          .startAfter(lastDoc.data().timestamp)
          .limit(7)
          .get();

        if (!snapshot.empty) {
          let newCards = cards;

          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

          for (let i = 0; i < snapshot.docs.length; i++) {
            if (
              blockedArray.includes(snapshot.docs[i].data().creatorId) === false
            ) {
              newCards.push(snapshot.docs[i].data());
            }
            //newCards.push(snapshot.docs[i].data());
          }

          setCards(newCards);
          if (snapshot.docs.length < 7) setLastDoc(null);
        } else {
          setLastDoc(null);
        }

        setIsMoreLoading(false);
      }, 1000);
    }

    onEndReachedCalledDuringMomentum = true;
  };

  // Load more cards on refresh trigger
  onRefresh = () => {
    getCards();
  };

  // Show a loading spinner at bottom of screen
  renderFooter = () => {
    if (!isMoreLoading) return true;

    return (
      <ActivityIndicator
        size="large"
        color={"#202020"}
        style={{ marginBottom: 15, marginTop: 15, opacity: 0.5 }}
      />
    );
  };

  return (
    <View style={styles.cardContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={cards}
        keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => (
          <Card
            postId={item.postId}
            username={item.username}
            creatorId={item.creatorId}
            title={item.title}
            content={item.content}
            postPattern={item.cardPattern}
            postColor={item.cardColor}
          />
        )}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        initialNumToRender={7}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum = false;
        }}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum && !isMoreLoading) {
            getMore();
          }
        }}
      />
    </View>
  );
};

export default CardList;

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
