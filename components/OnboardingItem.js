import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";

const OnboardingItem = (item) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.item.title}</Text>
        <Text style={styles.description}>{item.item.description}</Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    fontFamily: "Cocogoose",
    textAlign: "center",
    marginBottom: 10,
    color: "#202020",
  },
  description: {
    fontSize: 16,
    color: "rgba(0,0,0,0.8)",
    lineHeight: 30,
    textAlign: "center",
    paddingHorizontal: 15,
  },
});
