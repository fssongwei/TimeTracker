import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "@ant-design/react-native";
import ColorCard from "../components/ColorCard";
import HeaderText from "../components/HeaderText";
import { useSelector } from "react-redux";
import moment from "moment";
import useTimer from "../hooks/useTimer";
import formatTime from "../utilities/formatTime";

const TrendCard = ({ timerId, preWeekRecords, thisWeekRecords }) => {
  const { timer } = useTimer(timerId);
  if (!timer) return null;
  const getDuration = (records) => {
    let duration = 0;
    for (let record of records) {
      duration += (moment(record.endTime) - moment(record.startTime)) / 1000;
    }
    return duration;
  };

  let preDuration = getDuration(preWeekRecords);
  let thisDuration = getDuration(thisWeekRecords);
  let iconLabel = preDuration > thisDuration ? "down-circle" : "up-circle";
  let time = formatTime(thisDuration / 7);

  return (
    <ColorCard color={timer.color}>
      <Icon name={iconLabel} size={50} />
      <View style={{ paddingLeft: 20 }}>
        <Text style={styles.cardLabel}>{timer.name}</Text>
        <View style={{ flexDirection: "row", alignItems: "baseline" }}>
          <Text style={{ color: "white", fontSize: 40 }}>{time.timeValue}</Text>
          <Text style={{ color: "white" }}>{time.unit} / Day</Text>
        </View>
      </View>
    </ColorCard>
  );
};

const TrendGroup = () => {
  const records = useSelector((state) => state.records);
  let startOfTheWeek = moment().startOf("day");
  let endOfTheWeek = moment().endOf("day").add(1, "days");
  let startOfThePreviousWeek = moment(startOfTheWeek).subtract(1, "week");
  let endOfThePreviousWeek = moment(endOfTheWeek).subtract(1, "week");

  const [data, setData] = useState([]);
  useEffect(() => {
    let map = new Map();
    for (let record of records) {
      if (
        moment(record.startTime).isAfter(startOfThePreviousWeek) &&
        moment(record.startTime).isBefore(endOfTheWeek)
      ) {
        let timerId = record.timerId;
        let obj = map.get(timerId);
        if (!obj)
          obj = {
            preWeekRecords: [],
            thisWeekRecords: [],
          };

        if (moment(record.startTime).isBefore(endOfThePreviousWeek)) {
          obj.preWeekRecords.push(record);
        } else {
          obj.thisWeekRecords.push(record);
        }
        map.set(timerId, obj);
      }
    }

    let newData = [];
    for (let [key, value] of map) {
      newData.push({ ...value, timerId: key });
    }
    setData(newData);
  }, [records]);

  return (
    <View style={styles.group}>
      <HeaderText style={styles.title}>Trend</HeaderText>
      {data.map((item) => {
        return <TrendCard key={item.timerId} {...item} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  group: {
    marginTop: 20,
    marginBottom: 70,
  },
  title: {
    padding: 20,
  },
  card: {
    width: "100%",
    height: 100,
    backgroundColor: "steelblue",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 15,
  },
  cardLabel: {
    fontSize: 20,
    color: "#fff",
  },
});

export default TrendGroup;
