import React from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

function ViewLetterScreen() {
  const route = useRoute();

  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView>
        <Text style={styles.Username}>
          @{route.params.dummyData.username}'s reply
        </Text>
        <Text style={styles.Title}>{route.params.dummyData.Title}</Text>
        <Text style={styles.Content}>{route.params.dummyData.Content}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    padding: 15,
    paddingTop: 20,
    backgroundColor: "#FFF1E4",
    height: "100%",
  },
  Title: {
    fontSize: 20,
    fontWeight: "700",
  },
  Content: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
    lineHeight: 30,
  },
  Username: {
    fontSize: 24,
    fontWeight: "700",
  },
});

export default ViewLetterScreen;
