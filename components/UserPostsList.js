import React from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const UserPostsList = ({ title, content, postPattern, postColor }) => {
  const navigation = useNavigation();

  return (
    <ListItem
      containerStyle={styles.container}
      onPress={() =>
        navigation.push("View Post", {
          Post: {
            content,
            title,
            postPattern,
            postColor,
          },
        })
      }
    >
      <ListItem.Content>
        {/* <ListItem.Title style={styles.username}>@{username}</ListItem.Title> */}
        <ListItem.Subtitle
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.title}
        >
          {title}
        </ListItem.Subtitle>
        <ListItem.Subtitle
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.textPreview}
        >
          {content}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default UserPostsList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF1E4",
    borderBottomWidth: 0.75,
    borderBottomColor: "#E8D7CC",
  },
  username: {
    fontWeight: "800",
    fontSize: 20,
  },
  title: {
    fontWeight: "700",
    lineHeight: 30,
  },
  textPreview: {
    opacity: 0.8,
  },
});
