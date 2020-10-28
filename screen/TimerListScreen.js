import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text, AsyncStorage } from "react-native";
import Tracker from "../components/Tracker";
import IconButton from "../components/IconButton";
import HeaderText from "../components/HeaderText";
import { fetchTimers, deleteTimer } from "../actions/timersAction";
import { fetchRecords } from "../actions/recordsAction";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@ant-design/react-native";

const TimerScreen = ({ navigation }) => {
  const timers = useSelector((state) => state.timers);
  const dispatch = useDispatch();

  // Init the timers and records
  useEffect(() => {
    dispatch(fetchTimers());
    dispatch(fetchRecords());

    const fetchTimerStatus = async () => {
      let timerStatus = await AsyncStorage.getItem("TimerStatus");
      timerStatus = timerStatus ? JSON.parse(timerStatus) : {};
      if (timerStatus.startTime) {
        Modal.alert(
          "Resume?",
          "Do you want to resume your last unfinish timer?",
          [
            {
              text: "Cancel",
              onPress: () => {
                AsyncStorage.setItem("TimerStatus", JSON.stringify({}));
              },
            },
            {
              text: "Start",
              onPress: () => {
                navigation.navigate("Timer", {
                  timer: timerStatus.timer,
                  startTime: timerStatus.startTime,
                });
              },
            },
          ]
        );
      }
    };
    fetchTimerStatus();
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <HeaderText>Timer</HeaderText>
        <IconButton
          name="plus"
          size="lg"
          color="#000"
          onPress={() =>
            navigation.navigate("Create", {
              mode: "new",
            })
          }
        />
      </View>

      {timers.length === 0 && (
        <View
          style={{
            width: "100%",
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text> No timer yet.</Text>
        </View>
      )}

      <ScrollView>
        {timers.map((timer) => {
          return (
            <Tracker
              key={timer.id}
              timer={timer}
              onTrackerPress={() =>
                navigation.navigate("Timer", { timer: timer })
              }
              onDelete={() => {
                dispatch(deleteTimer(timer.id));
              }}
              onEdit={() => {
                navigation.navigate("Create", {
                  mode: "edit",
                  oldTimer: timer,
                });
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
    paddingTop: 50,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
  },
});

export default TimerScreen;
