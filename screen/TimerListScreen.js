import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Tracker from "../components/Tracker";
import IconButton from "../components/IconButton";
import HeaderText from "../components/HeaderText";
import useTimerList from "../hooks/useTimerList";
import { add } from "react-native-reanimated";

const TimerScreen = (props) => {
  const [loading, timerList, error, addTimer, deleteTimer] = useTimerList();
  if (loading) return null;
  try {
    deleteTimer({
      name: "test2",
      color: "yello",
    });
  } catch (error) {}

  console.log(timerList);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <HeaderText style={styles.title}>Timer</HeaderText>
        <IconButton
          name="plus"
          size="lg"
          color="#000"
          onPress={() => props.navigation.navigate("Create")}
        />
      </View>
      <ScrollView>
        <Tracker onTrackerPress={() => props.navigation.navigate("Timer")} />
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
  title: {
    fontSize: 40,
    fontWeight: "600",
    margin: 20,
  },
});

export default TimerScreen;
