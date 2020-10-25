import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import IconButton from "../components/IconButton";
import moment from "moment";
import { useSelector } from "react-redux";
import useTimer from "../hooks/useTimer";
import useRecords from "../hooks/useRecords";
import HeaderText from "../components/HeaderText";
import { SwipeAction, Modal } from "@ant-design/react-native";
import { deleteRecord } from "../actions/recordsAction";

const RecordCard = ({ record, onDelete }) => {
  const { timer } = useTimer(record.timerId);

  let duration = (moment(record.endTime) - moment(record.startTime)) / 1000;
  const { timeValue, unit } = formatTime(duration);

  let startTime = moment(record.startTime).format("hh:mm A");
  let endTime = moment(record.endTime).format("hh:mm A");

  if (timer === null) return null;

  const onDeleteConfirm = () => {
    Modal.alert("Are you sure?", "This operation can not be reverted.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Delete", onPress: onDelete },
    ]);
  };

  const right = [
    {
      text: "Delete",
      onPress: onDeleteConfirm,
      style: { backgroundColor: "#E67E22", color: "white" },
    },
  ];

  return (
    <SwipeAction
      autoClose
      style={{
        backgroundColor: timer.color,
        width: "96%",
        marginHorizontal: "2%",
        marginVertical: 5,
        flex: 1,
        borderRadius: 10,
      }}
      right={right}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 100,
          padding: 15,
        }}
      >
        <View style={{ flex: 1 }}>
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
    </SwipeAction>
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

const HeaderButtonGroups = ({
  onFilterPress,
  onCalendarPress,
  onAddRecordPress,
  selectedTimer,
}) => {
  const { timer, changeTimer } = useTimer(
    selectedTimer !== null ? selectedTimer.id : null
  );
  useEffect(() => {
    changeTimer(selectedTimer !== null ? selectedTimer.id : null);
  }, [selectedTimer]);

  return (
    <View style={styles.header}>
      <HeaderText>Record</HeaderText>
      <View style={{ flexDirection: "row" }}>
        <IconButton
          name="filter"
          size="lg"
          onPress={onFilterPress}
          color={timer !== null ? timer.color : "#000"}
        />
        <IconButton
          name="calendar"
          size="lg"
          onPress={onCalendarPress}
          style={{ paddingHorizontal: 20 }}
        />
        <IconButton name="plus" size="lg" onPress={onAddRecordPress} />
      </View>
    </View>
  );
};

const RecordScreen = ({ navigation, route }) => {
  const timers = useSelector((state) => state.timers);
  const [selectedTimer, setSelectedTimer] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  const filterData = [{ name: "All", value: null }];
  for (let timer of timers) filterData.push({ name: timer.name, value: timer });

  // Keep Track of selectedTimer & selectedDate
  const { params } = route;
  useEffect(() => {
    if (!params) return;
    if (params.selected) setSelectedTimer(params.selected.value);
    if (params.selectedDate) setSelectedDate(params.selectedDate);
  }, [params]);

  // Keep Track of Record
  const { records, changeRecordsQuery } = useRecords(
    selectedDate,
    selectedTimer
  );
  useEffect(() => {
    changeRecordsQuery(selectedDate, selectedTimer ? selectedTimer.id : null);
  }, [selectedDate, selectedTimer]);

  const onFilterPress = () => {
    navigation.navigate("Filter", {
      data: filterData,
      select: selectedTimer
        ? { name: selectedTimer.name, value: selectedTimer }
        : { name: "All", value: null },
    });
  };

  const onCalendarPress = () => {
    navigation.navigate("Calendar", {
      selectedDate: selectedDate,
    });
  };

  const onAddRecordPress = () => {
    navigation.navigate("Add Record", { mode: "add" });
  };

  return (
    <View style={styles.screen}>
      <HeaderButtonGroups
        onFilterPress={onFilterPress}
        onCalendarPress={onCalendarPress}
        selectedTimer={selectedTimer}
        onAddRecordPress={onAddRecordPress}
      />

      <ScrollView style={{ width: "100%" }}>
        <View
          style={{
            marginTop: 20,
            width: "100%",
            paddingHorizontal: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "600" }}>
            {moment().format("YYYY-MM-DD") === selectedDate
              ? "Today"
              : moment(selectedDate, "YYYY-MM-DD").format("MMM Do, YYYY")}
          </Text>
        </View>

        {records.length > 0 && <SummaryCard records={records} />}

        {records.length === 0 && (
          <View style={{ width: "100%", alignItems: "center" }}>
            <Text style={{ marginVertical: 50 }}>No Record</Text>
          </View>
        )}

        {records.map((record) => {
          return (
            <RecordCard
              record={record}
              key={record.id}
              onDelete={() => {
                dispatch(deleteRecord(record.id));
              }}
            />
          );
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
    paddingTop: 50,
  },
  cardLabel: {
    fontSize: 20,
    color: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    width: "100%",
  },
});

export default RecordScreen;

// helper functions

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
    toString: timeValue + " " + unit,
  };
};
