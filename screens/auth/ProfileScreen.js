import React, { useEffect, useLayoutEffect, useState } from "react";
import * as firebase from "firebase";
import { auth } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const getUsername = async () => {
      try {
        const value = await AsyncStorage.getItem("userData");
        if (value != null) {
          const username = JSON.parse(value).displayName;
          console.log(username);
          setDisplayName(username);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsername();
  }, [dispatch]);

  // Update header titrle
  useLayoutEffect(() => {
    //navigation.mode = "mode";
    navigation.setOptions({
      title: displayName,
      headerTitleAlign: "center",
      headerBackTitle: "Back",
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.container}>
        <View style={styles.linkContainer}>
          <Text style={styles.content}>{displayName}</Text>
        </View>
        <View style={styles.linkContainer}>
          <Text style={styles.content}>Account</Text>
        </View>
        <View style={styles.linkContainer}>
          <Text style={styles.content}>Your Posts</Text>
        </View>
        {/* <View style={styles.linkContainer}>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="rgba(0,0,0,0.05)"
            style={styles.linkContainer}
            onPress={() => {
              navigation.navigate("Your Posts");
            }}
          >
            <Text style={styles.content}>Your posts</Text>
          </TouchableHighlight>
        </View> */}
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="rgba(0,0,0,0.05)"
          style={styles.linkContainer}
          onPress={
            () => navigation.navigate("Onboarding")
            //analytics().logEvent("viewed_onboarding"))
          }
        >
          <Text style={styles.content}>How it works</Text>
        </TouchableHighlight>
        {/* <View style={styles.linkContainer}>
          <Text style={styles.content}>Community Guidelines</Text>
        </View> */}
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="rgba(0,0,0,0.05)"
          style={styles.linkContainer}
          onPress={() =>
            Linking.openURL("https://talkrelief.app/terms-of-service")
          }
        >
          <Text style={styles.content}>Terms of Service</Text>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="rgba(0,0,0,0.05)"
          style={styles.linkContainer}
          onPress={() =>
            Linking.openURL("https://talkrelief.app/privacy-policy")
          }
        >
          <Text style={styles.content}>Privacy Policy</Text>
        </TouchableHighlight>
        <View style={styles.linkContainer}>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="rgba(232,215,204,0.4)"
            style={styles.btnBG}
            onPress={() => {
              dispatch(authActions.logout());
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
