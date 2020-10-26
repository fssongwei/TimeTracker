/* tslint:disable:no-console */
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SwipeAction, Modal } from "@ant-design/react-native";
import useRecords from "../hooks/useRecords";
import moment from "moment";
import formatTime from "../utilities/formatTime";

const Tracker = ({ timer, onTrackerPress, onDelete, onEdit }) => {
  const { records } = useRecords(moment().format("YYYY-MM-DD"), timer.id);
  const [duration, setDuration] = useState({ timeValue: "", unit: "" }); //{ timeValue: "", unit: "" }
  useEffect(() => {
    let totalTime = 0;
    for (let record of records) {
      totalTime += moment(record.endTime) - moment(record.startTime);
    }
    totalTime /= 1000;
    if (totalTime === 0) setDuration({ timeValue: "", unit: "" });
    else setDuration(formatTime(totalTime));
  }, [records]);

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
      style: { backgroundColor: "#3498DB", color: "white" },
    },
    {
      text: "Delete",
      onPress: onDeleteConfirm,
      style: { backgroundColor: "#E67E22", color: "white" },
    },
  ];
  // const left = [
  //   {
  //     text: "Read",
  //     onPress: () => console.log("read"),
  //     style: { backgroundColor: "blue", color: "white" },
  //   },
  //   {
  //     text: "Reply",
  //     onPress: () => console.log("reply"),
  //     style: { backgroundColor: "green", color: "white" },
  //   },
  // ];
  return (
    <SwipeAction
      autoClose
      style={{ backgroundColor: timer.color }}
      right={right}
      // left={left}
    >
      <TouchableOpacity
        style={{ ...styles.card, backgroundColor: timer.color }}
        onPress={onTrackerPress}
      >
        <Text style={styles.cardLabel}>{timer.name}</Text>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 30 }}>
            {duration.timeValue}
          </Text>
          <Text style={{ color: "white" }}>{duration.unit}</Text>
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
