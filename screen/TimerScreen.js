import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
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
        <Timer timerSwitch={timerSwitch} initTime={new Date()} />

        <IconButton
          name={timerSwitch ? "pause" : "play-square"}
          size={60}
          color="#000"
          onPress={() => {
            if (!timerSwitch) {
              setStartTime(new Date());
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
              }
            }
            setTimerSwitch(!timerSwitch);
          }}
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
