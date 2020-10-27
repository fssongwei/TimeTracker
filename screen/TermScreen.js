import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import HTML from "../assets/term";

const TermScreen = () => {
  return (
    <View style={styles.screen}>
      <WebView
        source={{ html: HTML }}
        style={{ flex: 1, width: Dimensions.get("screen").width, height: 768 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TermScreen;
