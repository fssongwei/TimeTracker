import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import PieChart from "../components/PieChart";
import { SegmentedControl } from "@ant-design/react-native";
import HeaderText from "../components/HeaderText";
import moment from "moment";
import IconButton from "../components/IconButton";
import useRecords from "../hooks/useRecords";
import { useSelector } from "react-redux";

const DateLabel = ({ mode, range, onPrevious, onFuture }) => {
  let text = "";
  if (mode === "Day")
    text = moment(range.startDate).isSame(moment(), "d")
      ? "Today"
      : moment(range.startDate).format("MMM Do YYYY");

  if (mode === "Week")
    text =
      moment(range.startDate).format("MMM Do YYYY") +
      " - " +
      moment(range.endDate).format("MMM Do YYYY");

  if (mode === "Month") text = moment(range.startDate).format("MMMM YYYY");
  if (mode === "Year") text = moment(range.startDate).format("YYYY");

  return (
    <View style={DateLabelStyles.label}>
      <IconButton name="left" color="grey" onPress={onPrevious} />
      <Text style={DateLabelStyles.text}>{text}</Text>
      <IconButton name="right" color="grey" onPress={onFuture} />
    </View>
  );
};

const DateLabelStyles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
  label: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

const SummaryGroup = () => {
  const [currentMode, setCurrentMode] = useState("Day");
  const [range, setRange] = useState({
    startDate: moment().startOf(currentMode).format("YYYY-MM-DD"),
    endDate: moment().endOf(currentMode).format("YYYY-MM-DD"),
  });

  useEffect(() => {
    setRange({
      startDate: moment().startOf(currentMode).format("YYYY-MM-DD"),
      endDate: moment().endOf(currentMode).format("YYYY-MM-DD"),
    });
  }, [currentMode]);

  const onPrevious = () => {
    setRange({
      startDate: moment(range.startDate)
        .subtract(1, currentMode)
        .format("YYYY-MM-DD"),
      endDate: moment(range.endDate)
        .subtract(1, currentMode)
        .format("YYYY-MM-DD"),
    });
  };

  const onFuture = () => {
    setRange({
      startDate: moment(range.startDate)
        .add(1, currentMode)
        .format("YYYY-MM-DD"),
      endDate: moment(range.endDate).add(1, currentMode).format("YYYY-MM-DD"),
    });
  };

  // Get Records Within Range
  const allRecords = useSelector((state) => state.records);
  const [records, setRecords] = useState([]);
  useEffect(() => {
    let newRecords = [];
    for (let record of allRecords) {
      if (
        moment(record.startTime).isAfter(moment(range.startDate)) &&
        moment(record.startTime).isBefore(moment(range.endDate).add(1, "day"))
      ) {
        newRecords.push(record);
      }
    }
    setRecords(newRecords);
  }, [allRecords, range]);

  return (
    <View>
      <HeaderText style={styles.title}>Summary</HeaderText>
      <View style={{ padding: 20 }}>
        <SegmentedControl
          selectedIndex={0}
          values={["Day", "Week", "Month", "Year"]}
          onChange={(e) => setCurrentMode(e.nativeEvent.value)}
        />
      </View>

      <DateLabel
        range={range}
        mode={currentMode}
        onPrevious={onPrevious}
        onFuture={onFuture}
      />
      <PieChart records={records} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    padding: 20,
  },
});

export default SummaryGroup;
