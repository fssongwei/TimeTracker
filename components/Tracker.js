/* tslint:disable:no-console */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  Card,
  List,
  SwipeAction,
  Modal,
  WhiteSpace,
} from "@ant-design/react-native";
const Tracker = ({ timer, onTrackerPress, onDelete, onEdit }) => {
  const onDeleteConfirm = () => {
    Modal.alert(
      'Delete Timer "' + timer.name + '"',
      "Deleting this timer will also delete its data.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Delete", onPress: onDelete },
      ]
    );
  };

  const right = [
    {
      text: "Edit",
      onPress: onEdit,
      style: { backgroundColor: "grey", color: "white" },
    },
    {
      text: "Delete",
      onPress: onDeleteConfirm,
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
      style={{ backgroundColor: timer.color }}
      right={right}
      left={left}
    >
      <TouchableOpacity
        style={{ ...styles.card, backgroundColor: timer.color }}
        onPress={onTrackerPress}
      >
        <Text style={styles.cardLabel}>{timer.name}</Text>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 30 }}>58</Text>
          <Text style={{ color: "white" }}>Minutes</Text>
        </View>
      </TouchableOpacity>
    </SwipeAction>
  );
};

export default Tracker;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  cardLabel: {
    fontSize: 20,
    color: "#fff",
  },
});
