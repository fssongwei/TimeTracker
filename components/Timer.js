import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { min } from "react-native-reanimated";

const Timer = ({ timerSwitch, initTime }) => {
  let difference = Math.floor((new Date() - initTime) / 1000);
  const [time, setTime] = useState({
    seconds: "00",
    minutes: "00",
    hours: 0,
  });

  useEffect(() => {
    const setTimer = () => {
      difference++;
      let diff = difference;
      let hours = Math.floor(diff / 3600);
      diff %= 3600;
      let minutes = Math.floor(diff / 60);
      if (minutes < 10) minutes = "0" + minutes;
      diff %= 60;
      let seconds = diff;
      if (seconds < 10) seconds = "0" + seconds;
      setTime({
        seconds: seconds,
        minutes: minutes,
        hours: hours,
      });
      return setTimer;
    };
    let id;
    if (!timerSwitch) clearInterval(id);
    else id = setInterval(setTimer(), 1000);
    return () => clearInterval(id);
  }, [timerSwitch]);

  return (
    <View style={{ flexDirection: "row", alignItems: "baseline" }}>
      {time.hours > 0 && (
        <>
          <View style={styles.box}>
            <Text style={styles.lg}>{time.hours}</Text>
            <Text style={styles.sm}>HOURS</Text>
          </View>
          <Text style={styles.lg}>:</Text>
        </>
      )}

      <View style={styles.box}>
        <Text style={styles.lg}>{time.minutes}</Text>
        <Text style={styles.sm}>MINUTES</Text>
      </View>

      <Text style={styles.lg}>:</Text>

      <View style={styles.box}>
        <Text style={styles.lg}>{time.seconds}</Text>
        <Text style={styles.sm}>SECONDS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    width: "25%",
  },
  lg: {
    fontSize: 60,
    fontWeight: "600",
  },
  sm: {
    fontSize: 15,
    fontWeight: "300",
  },
});

export default Timer;
