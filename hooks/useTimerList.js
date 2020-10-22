import { AsyncStorage } from "react-native";
import { useState, useEffect } from "react";

const useTimerList = () => {
  const [timerList, setTimerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTimerList = async () => {
      try {
        const list = await AsyncStorage.getItem("TimerList");
        if (list) setTimerList(JSON.parse(list));
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchTimerList();
  }, []);

  const addTimer = async (newTimer) => {
    for (let timer of timerList) {
      if (timer.name === newTimer.name) throw "Timer name exists!";
    }

    let id = timerList.length > 0 ? timerList[timerList.length - 1].id + 1 : 0;
    newTimer.id = id;
    let newTimerList = [...timerList];
    newTimerList.push(newTimer);
    await AsyncStorage.setItem("TimerList", JSON.stringify(newTimerList));
    setTimerList(newTimerList);
  };

  const deleteTimer = async (id) => {
    let newTimerList = [];
    let found = false;
    for (let timer of timerList) {
      if (timer.id !== id) newTimerList.push(timer);
      else found = true;
    }
    if (!found) throw "Nothing to delete";
    await AsyncStorage.setItem("TimerList", JSON.stringify(newTimerList));
    setTimerList(newTimerList);
  };

  const editTimer = async (id, newTimer) => {
    for (let timer of timerList) {
      if (timer.name === newTimer.name && id !== timer.id)
        throw "Timer name exists!";
    }
    newTimer.id = id;
    let newTimerList = [];
    let found = false;
    for (let timer of timerList) {
      if (timer.id !== id) newTimerList.push(timer);
      else {
        found = true;
        newTimerList.push(newTimer);
      }
    }
    if (!found) throw "Nothing to update";
    await AsyncStorage.setItem("TimerList", JSON.stringify(newTimerList));
    setTimerList(newTimerList);
  };

  return [loading, timerList, error, addTimer, deleteTimer, editTimer];
};

export default useTimerList;
