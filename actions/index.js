import { AsyncStorage } from "react-native";

export const clearAll = () => async (dispatch) => {
  await AsyncStorage.setItem("TimerList", JSON.stringify([]));
  await AsyncStorage.setItem("RecordList", JSON.stringify([]));
  dispatch({
    type: "CLEAR_ALL",
  });
};
