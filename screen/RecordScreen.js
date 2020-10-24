import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ColorCard from "../components/ColorCard";
import { Button, Icon } from "@ant-design/react-native";
import IconButton from "../components/IconButton";
import moment from "moment";
import useRecord from "../hooks/useRecord";
import { useSelector } from "react-redux";
import useTimer from "../hooks/useTimer";

const formatTime = (seconds) => {
  let timeValue = seconds;
  let unit = "Seconds";
  if (Math.round(timeValue / 3600, -1) > 0) {
    timeValue = Math.round(timeValue / 3600, -1);
    unit = "Hours";
  }
  if (Math.round(timeValue / 60) > 0) {
    timeValue = Math.round(timeValue / 60);
    unit = "Minutes";
  }
  timeValue = Math.round(timeValue);
  return {
    timeValue: timeValue,
    unit: unit,
  };
};

const RecordCard = ({ record }) => {
  const timer = useTimer(record.timerId);

  let duration = (moment(record.endTime) - moment(record.startTime)) / 1000;
  const { timeValue, unit } = formatTime(duration);

  let startTime = moment(record.startTime).format("hh:mm A");
  let endTime = moment(record.endTime).format("hh:mm A");

  if (timer === null) return null;
  return (
    <ColorCard
      color={timer.color}
      round
      style={{ width: "96%", marginHorizontal: "2%", marginVertical: 5 }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={styles.cardLabel}>{timer.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={{ color: "white", fontSize: 40 }}>{timeValue}</Text>
            <Text style={{ color: "white" }}>{unit}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "#fff" }}>{`${startTime} - ${endTime}`}</Text>
        </View>
      </View>
    </ColorCard>
  );
};

const SummaryCard = ({ records }) => {
  let totalduration = 0;
  for (let record of records) {
    totalduration += (moment(record.endTime) - moment(record.startTime)) / 1000;
  }
  const { timeValue: totalTimeValue, unit: totalTimeUnit } = formatTime(
    totalduration
  );

  const { timeValue: avgTimeValue, unit: avgTimeUnit } = formatTime(
    totalduration / records.length
  );

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginVertical: 20,
      }}
    >
      <View
        style={{ alignItems: "center", width: "50%", borderRightWidth: 0.25 }}
      >
        <Text style={{ fontSize: 20 }}>Total</Text>
        <View style={{ flexDirection: "row", alignItems: "baseline" }}>
          <Text style={{ fontSize: 40 }}>{totalTimeValue}</Text>
          <Text>{totalTimeUnit}</Text>
        </View>
      </View>

      <View style={{ alignItems: "center", width: "50%" }}>
        <Text style={{ fontSize: 20 }}>Average</Text>
        <View style={{ flexDirection: "row", alignItems: "baseline" }}>
          <Text style={{ fontSize: 40 }}>{avgTimeValue}</Text>
          <Text>{avgTimeUnit}</Text>
        </View>
      </View>
    </View>
  );
};

const RecordScreen = ({ navigation, route }) => {
  const timers = useSelector((state) => state.timers);
  const [selectedTimer, setSelectedTimer] = useState({
    name: "All",
    value: null,
  });
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  const filterData = [{ name: "All", value: null }];
  for (let timer of timers)
    filterData.push({ name: timer.name, value: timer.id });

  // Header Filter Button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          style={{
            borderColor: "transparent",
            backgroundColor: "transparent",
          }}
          onPress={() => {
            navigation.navigate("Filter", {
              data: filterData,
              select: selectedTimer,
            });
          }}
        >
          <Icon name="filter" size="xs" color="black" />
          {selectedTimer.name}
        </Button>
      ),
    });
  }, [selectedTimer]);

  // Keep Track of selectedTimer & selectedDate
  const { params } = route;
  useEffect(() => {
    if (!params) return;
    if (params.selectedTimer) setSelectedTimer(params.selectedTimer);
    if (params.selectedDate) setSelectedDate(params.selectedDate);
  }, [params]);

  // Keep Track of Record
  const { recordList, loading, getRecordsOnDateAndTimerId } = useRecord();
  const [records, setRecords] = useState([]);
  useEffect(() => {
    if (loading) return;
    const recordsResult = getRecordsOnDateAndTimerId(
      selectedDate,
      selectedTimer.value
    );
    setRecords(recordsResult);
  }, [selectedTimer, selectedDate, recordList, loading]);

  return (
    <View style={styles.screen}>
      <View
        style={{
          marginTop: 20,
          width: "100%",
          paddingHorizontal: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "600" }}>
          {moment().format("YYYY-MM-DD") === selectedDate
            ? "Today"
            : moment(selectedDate, "YYYY-MM-DD").format("MMM Do, YYYY")}
        </Text>
        <IconButton
          name="calendar"
          size="lg"
          color="black"
          onPress={() => {
            navigation.navigate("Calendar", {
              selectedDate: selectedDate,
            });
          }}
        />
      </View>

      {records.length > 0 && <SummaryCard records={records} />}

      {records.length === 0 && (
        <View>
          <Text style={{ marginVertical: 50 }}>No Record</Text>
        </View>
      )}

      <ScrollView>
        {records.map((record) => {
          return <RecordCard record={record} key={record.id} />;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
  },
  cardLabel: {
    fontSize: 20,
    color: "#fff",
  },
});

export default RecordScreen;
