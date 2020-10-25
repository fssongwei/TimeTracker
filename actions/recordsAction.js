import { AsyncStorage } from "react-native";

export const fetchRecords = () => async (dispatch) => {
  try {
    let list = await AsyncStorage.getItem("RecordList");
    if (list) list = JSON.parse(list);
    dispatch({
      type: "FETCH_RECORDS",
      payload: {
        records: list,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const addRecord = (newRecord) => async (dispatch, getState) => {
  // get current timers state
  let records = getState().records;

  // get a new id
  let id = records.length > 0 ? records[records.length - 1].id + 1 : 0;
  newRecord.id = id;

  // construct a new timer list & store in asyncStorage
  let newRecords = [...records, newRecord];
  await AsyncStorage.setItem("RecordList", JSON.stringify(newRecords));

  // dipsatch the new timer list to reducers
  dispatch({
    type: "SET_RECORDS",
    payload: {
      records: newRecords,
    },
  });
};

export const deleteRecord = (id) => async (dispatch, getState) => {
  let records = getState().records;
  let newRecords = [];
  for (let record of records) {
    if (record.id !== id) newRecords.push(record);
  }
  await AsyncStorage.setItem("RecordList", JSON.stringify(newRecords));

  dispatch({
    type: "SET_RECORDS",
    payload: {
      records: newRecords,
    },
  });
};

export const deleteRecordWithTimerId = (timerId) => async (
  dispatch,
  getState
) => {
  let records = getState().records;
  let newRecords = [];
  for (let record of records) {
    if (record.timerId !== timerId) newRecords.push(record);
  }
  await AsyncStorage.setItem("RecordList", JSON.stringify(newRecords));

  dispatch({
    type: "SET_RECORDS",
    payload: {
      records: newRecords,
    },
  });
};
