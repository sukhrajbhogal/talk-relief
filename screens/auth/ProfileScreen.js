import React from "react";
import firebase from "firebase/auth";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";
import { Text, View, SafeAreaView, StyleSheet, Button } from "react-native";

const ProfileScreen = (props) => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.screen}>
      <View>
        <Text> Profile </Text>
        <Button
          title="logout"
          onPress={() => {
            dispatch(authActions.signout());
            props.navigation.navigate("Auth");
          }}
        />
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
