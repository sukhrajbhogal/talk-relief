import React, { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";
import {
  Text,
  ScrollView,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  Linking,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SettingsScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState("");

  // Update header title
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerBackTitle: "Profile",
    });
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.container}>
        {/* Account */}
        {/* <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#F6E2D0" : "#FFF1E4",
            },
            styles.rowContainer,
          ]}
        >
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={30}
            color={"#202020"}
          />
          <Text style={styles.content}>Account</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={35}
            color={"#202020"}
          />
        </Pressable> */}
        {/* How it works */}
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#F6E2D0" : "#FFF1E4",
            },
            styles.rowContainer,
          ]}
          onPress={() => navigation.navigate("Onboarding")}
        >
          <MaterialCommunityIcons
            name="school-outline"
            size={30}
            color={"#202020"}
          />
          <Text style={styles.content}>How it works</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={35}
            color={"#202020"}
          />
        </Pressable>
        {/* <View style={styles.rowContainer}>
          <Text style={styles.content}>Community Guidelines</Text>
        </View> */}
        {/* Terms of Service */}
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#F6E2D0" : "#FFF1E4",
            },
            styles.rowContainer,
          ]}
          onPress={() =>
            Linking.openURL("https://talkrelief.app/terms-of-service")
          }
        >
          <MaterialCommunityIcons
            name="script-text-outline"
            size={30}
            color={"#202020"}
          />
          <Text style={styles.content}>Terms of Service</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={35}
            color={"#202020"}
          />
        </Pressable>

        {/* Privacy Policy */}
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#F6E2D0" : "#FFF1E4",
            },
            styles.rowContainer,
          ]}
          onPress={() =>
            Linking.openURL("https://talkrelief.app/privacy-policy")
          }
        >
          <MaterialCommunityIcons
            name="key-outline"
            size={30}
            color={"#202020"}
          />
          <Text style={styles.content}>Privacy Policy</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={35}
            color={"#202020"}
          />
        </Pressable>
        {/* Log out */}

        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#F6E2D0" : "#FFF1E4",
            },
            styles.rowContainer,
          ]}
          onPress={() => {
            dispatch(authActions.logout());
          }}
        >
          <MaterialCommunityIcons
            name="logout-variant"
            size={30}
            color={"red"}
          />
          <Text style={[styles.content, styles.logout]}>Log out</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={35}
            color={"#202020"}
          />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF1E4",
  },
  username: {
    fontSize: 30,
    fontFamily: "Cocogoose",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: 0.75,
    borderBottomColor: "#E8D7CC",
  },
  content: {
    fontSize: 18,
    marginVertical: 20,
    marginHorizontal: 10,
    marginRight: "auto",
  },
  logout: {
    color: "red",
  },
});

export default SettingsScreen;
