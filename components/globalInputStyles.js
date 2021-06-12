import { setGlobalStyles } from "react-native-floating-label-input";

setGlobalStyles.containerStyles = {
  borderWidth: 2,
  borderColor: "rgba(0,0,0,0.1)",
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingRight: 15,
  paddingVertical: 15,
  marginBottom: 15,
  // any styles you want to generalize to your input container
};
setGlobalStyles.labelStyles = {
  color: "#202020",
  // any styles you want to generalize to your floating label
};
setGlobalStyles.customLabelStyles = {
  fontSizeBlurred: 18,
  colorBlurred: "#202020",
  fontSizeFocused: 12,
  colorFocused: "#202020",
  topFocused: -15,
};
// any styles you want to generalize to focused and blurred label

setGlobalStyles.inputStyles = {
  color: "rgba(0,0,0,0.9)",
  paddingHorizontal: 5,
  fontSize: 18,
  top: 8,
  // any styles you want to generalize to your input
};
