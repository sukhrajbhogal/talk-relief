import React, { useLayoutEffect } from "react";
import firebase from "firebase/auth";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";
import {
  Text,
  ScrollView,
  View,
  SafeAreaView,
  StyleSheet,
  Button,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Update header title
  useLayoutEffect(() => {
    //navigation.mode = "mode";
    navigation.setOptions({
      title: "Saibi",
      headerTitleAlign: "center",
      headerBackTitle: "Back",
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.container}>
        <View style={styles.linkContainer}>
          <Text style={styles.content}>Account</Text>
        </View>
        <View style={styles.linkContainer}>
          <Text style={styles.content}>Your posts</Text>
        </View>
        <View style={styles.linkContainer}>
          <Text style={styles.content}>About</Text>
        </View>
        <View style={styles.linkContainer}>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="rgba(232,215,204,0.25)"
            style={styles.btnBG}
            onPress={() => {
              dispatch(authActions.logout());
              props.navigation.navigate("Auth");
            }}
          >
            <Text style={styles.logout}>Log out</Text>
          </TouchableHighlight>
        </View>
        {/* <Button
          title="Log out"
          onPress={() => {
            dispatch(authActions.logout());
            props.navigation.navigate("Auth");
          }}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF1E4",
  },
  container: {
    // marginVertical: 20,
  },
  linkContainer: {
    borderBottomWidth: 0.75,
    borderBottomColor: "#E8D7CC",
  },
  content: {
    fontSize: 18,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  logout: {
    fontSize: 18,
    marginVertical: 20,
    marginHorizontal: 15,
    color: "red",
  },
});

export default ProfileScreen;
