import React from "react";
import { View, Text } from "react-native";
import Toast, { BaseToast } from "react-native-toast-message";

// const props = {
//   topOffset: 50,
//   visibilityTime: 4000,
//   autoHide: true,
//   height: 60,
//   position: "top",
// };

export const toastConfig = {
  success: ({ text1, style, props, ...rest }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: "green", paddingLeft: 15 }}
      //contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: "400",
      }}
      text1={"😊 Your post was created!"}
      text2={props.uuid}
    />
  ),
  error: () => {},
  info: () => {},
  any_custom_type: () => {},
};
