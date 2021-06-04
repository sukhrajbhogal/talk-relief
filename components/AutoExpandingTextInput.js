import React from "react";
import { TextInput, StyleSheet } from "react-native";

class AutoExpandingTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      height: 0,
    };
  }

  render() {
    return (
      <TextInput
        {...this.props}
        multiline={true}
        onChangeText={(text) => {
          this.setState({ text });
        }}
        onContentSizeChange={(event) => {
          this.setState({ height: event.nativeEvent.contentSize.height });
        }}
        style={{ height: Math.max(35, this.state.height) }}
        value={this.state.text}
        placeholderTextColor="rgba(255,255,255,0.7)"
      />
    );
  }
}

export default AutoExpandingTextInput;

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    padding: 10,
    color: "#fff",
    fontSize: 16,
  },
});
