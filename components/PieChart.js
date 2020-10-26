import React, { useEffect, useState } from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";
import { PieChart } from "react-native-svg-charts";
import { Button } from "@ant-design/react-native";
import { useSelector } from "react-redux";
import moment from "moment";
import formatTime from "../utilities/formatTime";

const PieChartWithDynamicSlices = ({ records }) => {
  const [labelWidth, setLabelWidth] = useState(0);
  const [isPrecentage, setIsPrecentage] = useState(true);
  const [selectedSlice, setSelectedSlice] = useState({
    label: "Total",
    value: "100%",
  });
  const { label, value, labelValue } = selectedSlice;

  const [recordsWithTimer, setRecordsWithTimer] = useState(records);
  const timers = useSelector((state) => state.timers);
  useEffect(() => {
    let newRecords = [];
    for (let record of records) {
      for (let timer of timers) {
        if (timer.id === record.timerId) {
          record.timer = timer;
          newRecords.push(record);
          break;
        }
      }
    }
    setRecordsWithTimer(newRecords);
  }, [timers, records]);

  const [distribution, setDistribution] = useState(new Map());
  useEffect(() => {
    let map = new Map();
    for (let record of recordsWithTimer) {
      let duration = (moment(record.endTime) - moment(record.startTime)) / 1000;
      let key = record.timer;
      map.set(key, (map.get(key) || 0) + duration);
    }
    setDistribution(map);
  }, [recordsWithTimer]);

  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState([]);
  const [colors, setColors] = useState([]);
  const [labelValues, setLabelValues] = useState([]);
  useEffect(() => {
    let keys = [];
    let values = [];
    let colors = [];
    let labelValues = [];
    let totalDurations = 0;
    for (let [key, value] of distribution) {
      keys.push(key.name);
      values.push(value);
      colors.push(key.color);
      totalDurations += value;
    }

    labelValues = values.map((value) => {
      if (isPrecentage) return Math.round((value / totalDurations) * 100) + "%";
      return formatTime(value).toString();
    });

    values = values.map((value) => {
      return Math.round((value / totalDurations) * 100);
    });

    setKeys(keys);
    setValues(values);
    setColors(colors);
    setLabelValues(labelValues);
    setSelectedSlice({
      label: "Total",
      value: "100%",
      labelValue: isPrecentage ? "100%" : formatTime(totalDurations).toString(),
    });
  }, [distribution, isPrecentage]);

  const data = keys.map((key, index) => {
    return {
      key,
      value: values[index],
      svg: { fill: colors[index] },
      arc: {
        outerRadius: 40 + values[index] + "%",
        padAngle: label === key ? 0.1 : 0,
      },
      onPress: () =>
        setSelectedSlice({
          label: key,
          value: values[index],
          labelValue: labelValues[index],
        }),
    };
  });
  const deviceWidth = Dimensions.get("window").width;

  return (
    <View>
      <View style={{ justifyContent: "center" }}>
        <PieChart
          style={{ height: deviceWidth }}
          outerRadius={"50%"}
          innerRadius={"40%"}
          data={data}
        />
        <Text
          onLayout={({
            nativeEvent: {
              layout: { width },
            },
          }) => {
            setLabelWidth(width);
          }}
          style={{
            position: "absolute",
            left: deviceWidth / 2 - labelWidth / 2,
            textAlign: "center",
            fontSize: 20,
          }}
        >
          {keys.length > 0 ? `${label}\n${labelValue}` : "No Record"}
        </Text>
      </View>

      <View style={styles.buttonGroup}>
        <Button
          type="primary"
          size="small"
          style={styles.button}
          onPress={() => {
            setIsPrecentage(!isPrecentage);
          }}
        >
          {isPrecentage ? "%" : "value"}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 20,
    marginTop: -50,
  },
  button: {
    backgroundColor: "steelblue",
  },
});

export default PieChartWithDynamicSlices;
