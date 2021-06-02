import React, { useLayoutEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

function ViewLetterScreen({ navigation }) {
  const route = useRoute();

  // Update header title
  useLayoutEffect(() => {
    navigation.mode = "mode";
    navigation.setOptions({
      title: route.params.username + "'s reply",
      headerTitleAlign: "center",
      headerBackTitle: "Back",
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.Screen}>
      <ScrollView style={styles.Container}>
        <Text style={styles.Title}>{route.params.Title}</Text>
        <Text style={styles.Content}>{route.params.Content}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Screen: {
    backgroundColor: "#FFF1E4",
    height: "100%",
  },
  Container: {
    padding: 15,
  },
  Title: {
    fontSize: 20,
    fontWeight: "700",
    paddingTop: 10,
    paddingBottom: 20,
  },
  Content: {
    fontSize: 20,
    paddingBottom: 20,
    lineHeight: 40,
  },
});

export default ViewLetterScreen;
