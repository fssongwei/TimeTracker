import { AsyncStorage } from "react-native";
import { useState, useEffect } from "react";

const useRecord = () => {
  const [recordList, setRecordList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchRecordList = async () => {
      try {
        const list = await AsyncStorage.getItem("RecordList");
        if (list) setRecordList(JSON.parse(list));
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchRecordList();
  }, []);

  const addRecord = async (newRecord) => {
    let id =
      recordList.length > 0 ? recordList[recordList.length - 1].id + 1 : 0;
    newRecord.id = id;
    let newRecordList = [...recordList, newRecord];
    console.log(newRecordList);
    await AsyncStorage.setItem("RecordList", JSON.stringify(newRecordList));
    setRecordList(newRecordList);
  };

  const deleteRecord = async (id) => {
    let newRecordList = [];
    let found = false;
    for (let record of recordList) {
      if (record.id !== id) newRecordList.push(record);
      else found = true;
    }
    if (!found) throw "Nothing to delete";
    await AsyncStorage.setItem("RecordList", JSON.stringify(newRecordList));
    setRecordList(newRecordList);
  };

  const deleteRecordWithTimerId = async (timerId) => {
    let newRecordList = [];
    let found = false;
    for (let record of recordList) {
      if (record.timerId !== timerId) newRecordList.push(record);
      else found = true;
    }
    if (!found) throw "Nothing to delete";
    await AsyncStorage.setItem("RecordList", JSON.stringify(newRecordList));
    setRecordList(newRecordList);
  };

  const getRecordsWithTimerId = (timerId) => {
    let newRecordList = [];
    for (let record of recordList) {
      if (record.timerId === timerId) newRecordList.push(record);
    }
    return newRecordList;
  };

  const getRecordsOnDate = (date) => {
    let newRecordList = [];
    for (let record of recordList) {
      if (record.startTime.toDateString() === date.toDateString())
        newRecordList.push(record);
    }
    return newRecordList;
  };

  const getRecordsWithinRange = (start, end) => {
    let newRecordList = [];
    for (let record of recordList) {
      if (record.startTime >= start && record.startTime < end)
        newRecordList.push(record);
    }
    return newRecordList;
  };

  return {
    recordList,
    loading,
    error,
    addRecord,
    deleteRecord,
    deleteRecordWithTimerId,
    getRecordsWithTimerId,
    getRecordsOnDate,
    getRecordsWithinRange,
  };
};

export default useRecord;
