import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  List,
  Button,
  Picker,
  DatePicker,
  Toast,
} from "@ant-design/react-native";
import formatTime from "../utilities/formatTime";
import { useSelector, useDispatch } from "react-redux";
import { addRecord } from "../actions/recordsAction";

const AddRecordScreen = ({ navigation }) => {
  const [selectedTimer, setSelectedTimer] = useState(null);
  const [selectedTimerValue, setSelectedTimerValue] = useState(null); // only use for picker values
  const [selectedDate, setSelectedDate] = useState(null);
  const [minTime, setMinTime] = useState(null);
  const [maxTime, setMaxTime] = useState(null);
  const timers = useSelector((state) => state.timers);
  const data = timers.map((timer) => {
    return { label: timer.name, value: JSON.stringify(timer) };
  });

  const [buttonDisable, setButtonDisable] = useState(true);
  useEffect(() => {
    if (selectedTimer && selectedDate && minTime && maxTime)
      setButtonDisable(false);
  }, [selectedTimer, selectedDate, minTime, maxTime]);

  const dispatch = useDispatch();
  const onSubmit = () => {
    dispatch(
      addRecord({
        timerId: selectedTimer.id,
        startTime: minTime,
        endTime: maxTime,
      })
    );
    navigation.goBack();
    Toast.success("Record has been added!");
  };

  return (
    <View style={styles.screen}>
      <List>
        <Picker
          data={data}
          cols={1}
          value={selectedTimerValue}
          onOk={(timer) => {
            setSelectedTimerValue(timer);
            setSelectedTimer(JSON.parse(timer));
          }}
        >
          <List.Item arrow="horizontal">Timer</List.Item>
        </Picker>

        <DatePicker
          value={selectedDate}
          mode="date"
          defaultDate={
            new Date(Math.floor(new Date().getTime() / 60000) * 60000)
          }
          minDate={new Date(1997, 9, 16)}
          maxDate={new Date()}
          onChange={(date) => setSelectedDate(date)}
          format="YYYY-MM-DD"
        >
          <List.Item arrow="horizontal">Date</List.Item>
        </DatePicker>

        <DatePicker
          value={minTime}
          mode="time"
          defaultDate={
            new Date(Math.floor(new Date().getTime() / 60000) * 60000)
          }
          onChange={(time) => setMinTime(time)}
          maxDate={maxTime ? new Date(maxTime.getTime() - 60000) : null}
        >
          <List.Item arrow="horizontal">Start Time</List.Item>
        </DatePicker>

        <DatePicker
          value={maxTime}
          mode="time"
          defaultDate={new Date()}
          onChange={(time) => setMaxTime(time)}
          minDate={minTime ? new Date(minTime.getTime() + 60000) : null}
        >
          <List.Item arrow="horizontal">End Time</List.Item>
        </DatePicker>

        <List.Item
          extra={
            minTime && maxTime
              ? formatTime((maxTime - minTime) / 1000).toString()
              : ""
          }
        >
          Duration
        </List.Item>
      </List>

      <View style={{ marginHorizontal: 10, marginVertical: 50 }}>
        <Button type="primary" disabled={buttonDisable} onPress={onSubmit}>
          Add Record
        </Button>
      </View>
    </View>
  );
};

export default AddRecordScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#fff",
    flex: 1,
    paddingVertical: 30,
  },
});
