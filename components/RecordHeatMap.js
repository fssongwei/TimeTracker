import React, { useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { ContributionGraph } from "react-native-chart-kit";
import moment from "moment";

const RecordHeatMap = () => {
  const records = useSelector((state) => state.records);
  const [commitsData, setCommitsData] = useState([]);

  useEffect(() => {
    let map = new Map();
    for (let record of records) {
      let key = moment(record.startTime).format("YYYY-MM-DD");
      map.set(key, (map.get(key) || 0) + 1);
    }

    const newCommitsData = [];
    for (let [key, value] of map) {
      newCommitsData.push({ date: key, count: value });
    }
    setCommitsData(newCommitsData);
    console.log(newCommitsData);
  }, [records]);

  console.log(Dimensions.get("window").width);

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <ContributionGraph
        withDots={false}
        withShadow={false}
        withInnerLines={false}
        withOuterLines={false}
        values={commitsData}
        endDate={new Date()}
        numDays={(Math.floor(Dimensions.get("window").width * 2) / 55) * 7 - 3}
        width={Dimensions.get("window").width}
        height={220}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: (opacity = 1) => `rgba(65, 105, 225, ${opacity})`,
        }}
      />
    </View>
  );
};

export default RecordHeatMap;
