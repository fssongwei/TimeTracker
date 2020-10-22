/* tslint:disable:no-console */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, List, SwipeAction } from "@ant-design/react-native";
const Tracker = ({ onTrackerPress }) => {
  const right = [
    {
      text: "Edit",
      onPress: () => console.log("more"),
      style: { backgroundColor: "green", color: "white" },
    },
    {
      text: "Delete",
      onPress: () => console.log("delete"),
      style: { backgroundColor: "orange", color: "white" },
    },
  ];
  const left = [
    {
      text: "Read",
      onPress: () => console.log("read"),
      style: { backgroundColor: "blue", color: "white" },
    },
    {
      text: "Reply",
      onPress: () => console.log("reply"),
      style: { backgroundColor: "green", color: "white" },
    },
  ];
  return (
    <SwipeAction
      autoClose
      style={{ backgroundColor: "steelblue" }}
      right={right}
      left={left}
    >
      <TouchableOpacity style={styles.card} onPress={onTrackerPress}>
        <Text style={styles.cardLabel}>Learning</Text>
      </TouchableOpacity>
    </SwipeAction>
  );
};

export default Tracker;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 100,
    backgroundColor: "steelblue",
    justifyContent: "center",
  },
  cardLabel: {
    fontSize: 20,
    color: "#fff",
    paddingLeft: 20,
  },
});
