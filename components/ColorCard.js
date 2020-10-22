import React from "react";
import { View, StyleSheet } from "react-native";

const ColorCard = (props) => {
  return (
    <View
      style={{
        ...styles.card,
        backgroundColor: props.color ? props.color : "white",
        borderRadius: props.round ? 10 : 0,
        ...props.style,
      }}
    >
      {props.children}
    </View>
  );
};

export default ColorCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 100,
    backgroundColor: "steelblue",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
});
