import React from "react";
import { Text, StyleSheet } from "react-native";

const HeaderText = (props) => {
  return <Text style={styles.headerText}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 40,
    fontWeight: "600",
  },
});

export default HeaderText;
