import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Toast, { BaseToast } from "react-native-toast-message";

import bg10 from "../assets/bg10.png";

// Available props for BaseToast
// const baseToastProps = {
//   leadingIcon: ImageSource,
//   trailingIcon: ImageSource,
//   text1: String,
//   text2: String,
//   onPress: Function,
//   onLeadingIconPress: Function,
//   onTrailingIconPress: Function,
//   style: ViewStyle,
//   leadingIconContainerStyle: ViewStyle,
//   trailingIconContainerStyle: ViewStyle,
//   leadingIconStyle: ViewStyle,
//   trailingIconStyle: ViewStyle,
//   contentContainerStyle: ViewStyle,
//   text1Style: ViewStyle,
//   text2Style: ViewStyle,
//   activeOpacity: Number
// };

export const toastConfig = {
  success: ({ text1, style, props, ...rest }) => (
    <BaseToast
      {...rest}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text}
      trailingIconStyle={styles.trailingIconStyle}
      text1={text1}
      text2={props.uuid}
    />
  ),
  error: () => {},
  info: () => {},
  any_custom_type: () => {},
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1BB002",
    borderLeftColor: "#1BB002",
    paddingLeft: 25,
    borderRadius: 15,
    height: 60,
  },
  contentContainer: {
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
    color: "rgba(255,255,255,1)",
  },
  trailingIconStyle: {
    display: "none",
  },
});
