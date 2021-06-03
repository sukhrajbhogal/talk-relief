import React from "react";
import firebase from "firebase/auth";
import { Text, View, SafeAreaView, StyleSheet, Button } from "react-native";

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <View>
        <Text> Profile </Text>
        <Button title="logout" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF1E4",
  },
});

export default ProfileScreen;
