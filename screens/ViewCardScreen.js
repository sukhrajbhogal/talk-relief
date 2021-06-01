import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const { height } = Dimensions.get("window");
export const fullHeight = (height * 1564) / 974;

export default function ViewCardScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    //Show card full screen
    <ImageBackground
      source={route.params.Card.selectedBG}
      style={[
        styles.bgImage,
        { backgroundColor: route.params.Card.selectedColor },
      ]}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" animated={false} />
        <ScrollView style={styles.content}>
          <View style={styles.cardStyle}>
            <Text style={[styles.fontStyle, styles.cardTitle]}>
              {route.params.Card.Title}
            </Text>
            <Text
              numberOfLines={6}
              style={[styles.fontStyle, styles.cardContent]}
            >
              {route.params.Card.Content}
            </Text>
            <Text style={styles.fontStyle}>@{route.params.Card.username}</Text>
          </View>
        </ScrollView>
        <View style={styles.closeBG}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="window-close"
              size={24}
              color={"#202020"}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.replyBG}>
          <TouchableOpacity activeOpacity={0.5}>
            <MaterialCommunityIcons
              name="lead-pencil"
              size={35}
              color={"#202020"}
              style={styles.replyIcon}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    height: "100%",
    overflow: "hidden",
  },
  cardStyle: {
    padding: 20,
  },
  fontStyle: {
    color: "#fff",
    fontSize: 20,
  },
  cardTitle: {
    paddingTop: "12%",
    fontWeight: "bold",
    fontSize: 24,
  },
  cardContent: {
    marginTop: "7%",
    marginBottom: "7%",
    lineHeight: 30,
  },
  replyBG: {
    alignItems: "flex-start",
    flexDirection: "row",
    backgroundColor: "white",
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 40,
    right: 20,
    borderRadius: 50,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOffset: { height: 5, width: 0 },
  },
  replyIcon: {
    top: 12,
    right: 12,
    bottom: 12,
    left: 12,
  },
  closeBG: {
    alignItems: "flex-start",
    flexDirection: "row",
    backgroundColor: "white",
    position: "absolute",
    width: 30,
    height: 30,
    top: 40,
    right: 20,
    borderRadius: 50,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOffset: { height: 5, width: 0 },
  },
  closeIcon: {
    top: 3,
    right: 3,
    bottom: 3,
    left: 3,
  },
});
