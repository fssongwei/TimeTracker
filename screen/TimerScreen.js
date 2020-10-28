import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { Toast } from "@ant-design/react-native";
import IconButton from "../components/IconButton";
import Timer from "../components/Timer";
import { addRecord } from "../actions/recordsAction";
import { useDispatch } from "react-redux";

const TimerScreen = (props) => {
  const [timerSwitch, setTimerSwitch] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const timer = props.route.params.timer;
  const dispatch = useDispatch();

  useEffect(() => {
    let previousStartTime = props.route.params.startTime;
    if (previousStartTime) {
      setStartTime(new Date(previousStartTime));
      setTimerSwitch(true);
    }
  }, []);

  const onStartPress = () => {
    if (!timerSwitch) {
      let startTime = new Date();
      setStartTime(startTime);
      AsyncStorage.setItem(
        "TimerStatus",
        JSON.stringify({
          startTime: startTime,
          timer: timer,
        })
      );
    } else {
      let endTime = new Date();
      let duration = (endTime - startTime) / 1000;
      console.log(duration);
      if (duration < 5) {
        Toast.fail("Duration is not enough to be recorded");
      } else {
        dispatch(
          addRecord({
            timerId: timer.id,
            startTime: startTime,
            endTime: endTime,
          })
        );
        Toast.success("Record has been added!");
      }
      AsyncStorage.setItem("TimerStatus", JSON.stringify({}));
    }
    setTimerSwitch(!timerSwitch);
  };

  return (
    <View style={{ ...styles.screen, backgroundColor: timer.color }}>
      <View style={{ alignItems: "flex-end", padding: 20, height: 80 }}>
        {!timerSwitch && (
          <IconButton
            name="close"
            size="lg"
            color="#000"
            onPress={() => props.navigation.navigate("Home")}
          />
        )}
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Timer timerSwitch={timerSwitch} initTime={startTime} />

        <IconButton
          name={timerSwitch ? "pause" : "play-square"}
          size={60}
          color="#000"
          onPress={onStartPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "steelblue",
    flex: 1,
    paddingTop: 50,
  },
});

export default TimerScreen;
