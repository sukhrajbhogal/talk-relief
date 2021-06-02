import React from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const dummyData = {
  Title: "Everything will be ok",
  Content:
    "No worries man. I hope you’re having a better day! It’s totally normal to feel that way dude. Sometimes we just need a helping hand every now and then. For me, basketball helps me feel better. I’m here for you man!",
  username: "Saibi",
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
