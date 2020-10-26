import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const useRecords = (date, timerId) => {
  const [records, setRecords] = useState([]);
  const allRecords = useSelector((state) => state.records);

  useEffect(() => {
    let query = getRecordsOnDateAndTimerId(allRecords, date, timerId);
    setRecords(query);
  }, [allRecords]);

  const changeRecordsQuery = (date, timerId) => {
    let query = getRecordsOnDateAndTimerId(allRecords, date, timerId);
    setRecords(query);
  };

  const getRecordsWithinRange = (startDate, endDate) => {
    let newRecords = [];
    for (let record of allRecords) {
      if (
        moment(record.startTime).isAfter(moment(startDate)) &&
        moment(record.startTime).isBefore(moment(endDate).add(1, "day"))
      ) {
        newRecords.push(record);
      }
    }
    setRecords(newRecords);
  };

  return { records, changeRecordsQuery, getRecordsWithinRange };
};

const getRecordsOnDateAndTimerId = (records, date, timerId) => {
  let newRecords = [];
  for (let record of records) {
    if (
      moment(record.startTime).format("YYYY-MM-DD") === date &&
      (timerId === null || record.timerId === timerId)
    ) {
      newRecords.push(record);
    }
  }
  return newRecords;
};

export default useRecords;
