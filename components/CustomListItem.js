import React from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const dummyData = {
  Title: "How do you comfort a friend who’s super sad? :(",
  Content:
    "When comforting someone, I try to focus on making them feel safe first. Treat them to a snack they like, turn on music they enjoy, watch something familiar, etc. There’s huge comfort in safety and even if it’s just temporarily distracting them, it’ll mean a lot to them! I’m rooting for you!",
  username: "Pastaccine",
};

const CustomListItem = () => {
  const navigation = useNavigation();

  return (
    <ListItem
      containerStyle={styles.container}
      onPress={() => navigation.push("View Letter", dummyData)}
    >
      <ListItem.Content>
        <ListItem.Title style={styles.username}>
          @{dummyData.username}
        </ListItem.Title>
        <ListItem.Subtitle
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.title}
        >
          {dummyData.Title}
        </ListItem.Subtitle>
        <ListItem.Subtitle
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.textPreview}
        >
          {dummyData.Content}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

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
