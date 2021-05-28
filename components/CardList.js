import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import database from "../firebase";

export default function Cards() {
  const [cards, setCards] = useState([]);

  // Grab card data from cards collection database
  useEffect(() => {
    database
      .collection("cards")
      .onSnapshot((snapshot) =>
        setCards(snapshot.docs.map((doc) => doc.data()))
      );
  }, []);

  return (
    <View style={styles.cardContainer}>
      {cards.map((card) => (
        <View style={styles.cardStyle}>
          <Text style={[styles.fontStyle, styles.cardTitle]}>{card.Title}</Text>
          <Text style={[styles.fontStyle, styles.cardContent]}>
            {card.Content}
          </Text>
          <Text style={styles.fontStyle}>@{card.username}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    position: "relative",
    textAlign: "center",
    width: "85%",
  },
  cardStyle: {
    backgroundColor: "#C83E6F",
    padding: 20,
    paddingTop: "20%",
    borderRadius: 20,
    marginTop: "3%",
    marginBottom: "3%",
    height: "50%",
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
});
