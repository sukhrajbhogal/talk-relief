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
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ProfileScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState("");

  // Update header title
  useLayoutEffect(() => {
    const getUsername = async () => {
      try {
        const value = await AsyncStorage.getItem("userData");
        if (value != null) {
          const username = JSON.parse(value).displayName;
          // console.log(username);
          setDisplayName(username);
        }
      } catch (error) {
        console.log(error);
      }
    };
    navigation.setOptions({
      title: "",
      headerTitleAlign: "center",
      headerBackTitle: "Back",
    });
    getUsername();
  }, [dispatch]);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: displayName,
  //     headerTitleAlign: "center",
  //     headerBackTitle: "Back",
  //   });
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Header}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="window-close"
            size={35}
            color={"#202020"}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
        {/* <Text style={styles.headerTitle}>Sign Up</Text> */}

        <MaterialCommunityIcons
          name="cog"
          size={30}
          color={"#202020"}
          style={styles.closeIcon}
          onPress={() => navigation.navigate("Settings")}
        />
      </View>

      <ScrollView style={styles.contentContainer}>
        <View>
          <Text style={styles.username}>{displayName}</Text>
        </View>
        <Text>Displays all of the user's posts</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF1E4",
  },
  Header: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 15,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.75,
    borderBottomColor: "#E8D7CC",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  contentContainer: {
    padding: 20,
  },
  username: {
    fontSize: 30,
    fontFamily: "Cocogoose",
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
