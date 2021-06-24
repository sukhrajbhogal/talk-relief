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
        <View style={styles.rowContainer}>
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={30}
            color={"#202020"}
            style={styles.closeIcon}
          />
          <Text style={styles.content}>Account</Text>
        </View>
        <View style={styles.rowContainer}>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="rgba(0,0,0,0.05)"
            style={styles.rowContainer}
            onPress={() => navigation.navigate("Onboarding")}
          >
            <Text style={styles.content}>How it works</Text>
          </TouchableHighlight>
        </View>
        {/* <View style={styles.rowContainer}>
          <Text style={styles.content}>Community Guidelines</Text>
        </View> */}
        <View style={styles.rowContainer}>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="rgba(0,0,0,0.05)"
            style={styles.rowContainer}
            onPress={() =>
              Linking.openURL("https://talkrelief.app/terms-of-service")
            }
          >
            <Text style={styles.content}>Terms of Service</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.rowContainer}>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="rgba(0,0,0,0.05)"
            style={styles.rowContainer}
            onPress={() =>
              Linking.openURL("https://talkrelief.app/privacy-policy")
            }
          >
            <Text style={styles.content}>Privacy Policy</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.rowContainer}>
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
  },
  logout: {
    fontSize: 18,
    marginVertical: 20,
    marginHorizontal: 15,
    color: "red",
  },
});

export default SettingsScreen;
