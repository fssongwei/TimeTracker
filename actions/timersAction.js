import { AsyncStorage } from "react-native";

export const fetchTimers = () => async (dispatch) => {
  try {
    let list = await AsyncStorage.getItem("TimerList");
    if (list) list = JSON.parse(list);
    dispatch({
      type: "FETCH_TIMERS",
      payload: {
        timers: list,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTimer = (id) => async (dispatch, getState) => {
  try {
    let timers = getState().timers;
    let newTimers = [];
    for (let timer of timers) {
      if (timer.id !== id) newTimers.push(timer);
    }
    await AsyncStorage.setItem("TimerList", JSON.stringify(newTimers));
    dispatch({
      type: "DELETE_TIMERS",
      payload: {
        timers: newTimers,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const addTimer = (newTimer) => async (dispatch, getState) => {
  // get current timers state
  let timers = getState().timers;

  // check if the timer name exists
  for (let timer of timers) {
    if (timer.name === newTimer.name) throw "Timer name exists!";
  }

  // get a new id
  let id = timers.length > 0 ? timers[timers.length - 1].id + 1 : 0;
  newTimer.id = id;

  // construct a new timer list & store in asyncStorage
  let newTimers = [...timers, newTimer];
  await AsyncStorage.setItem("TimerList", JSON.stringify(newTimers));

  // dipsatch the new timer list to reducers
  dispatch({
    type: "ADD_TIMER",
    payload: {
      timers: newTimers,
    },
  });
};

export const editTimer = (newTimer) => async (dispatch, getState) => {
  let timers = getState().timers;
  const newTimers = timers.map((timer) => {
    if (timer.name === newTimer.name && timer.id !== newTimer.id) {
      throw "Timer name exists";
    }
    if (timer.id === newTimer.id) return newTimer;
    return timer;
  });
  await AsyncStorage.setItem("TimerList", JSON.stringify(newTimers));

  // dipsatch the new timer list to reducers
  dispatch({
    type: "EDIT_TIMER",
    payload: {
      timers: newTimers,
    },
  });
};
