import React, { useState } from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";
import { PieChart } from "react-native-svg-charts";
import { Button } from "@ant-design/react-native";

const PieChartWithDynamicSlices = () => {
  const [selectedSlice, setSelectedSlice] = useState({
    label: "Total",
    value: "100",
  });

  const [labelWidth, setLabelWidth] = useState(0);
  const [isPrecentage, setIsPrecentage] = useState(true);

  const { label, value } = selectedSlice;
  const keys = [
    "learning",
    "play game",
    "working",
    "transportation",
    "exercises",
  ];
  const values = [35, 18, 26, 20, 6];
  const colors = ["steelblue", "#9900cc", "#c61aff", "#d966ff", "#ecb3ff"];
  const data = keys.map((key, index) => {
    return {
      key,
      value: values[index],
      svg: { fill: colors[index] },
      arc: {
        outerRadius: 70 + values[index] + "%",
        padAngle: label === key ? 0.1 : 0,
      },
      onPress: () => setSelectedSlice({ label: key, value: values[index] }),
    };
  });
  const deviceWidth = Dimensions.get("window").width;

  return (
    <View>
      <View style={{ justifyContent: "center" }}>
        <PieChart
          style={{ height: deviceWidth }}
          outerRadius={"80%"}
          innerRadius={"45%"}
          data={data}
        />
        <Text
          onLayout={({
            nativeEvent: {
              layout: { width },
            },
          }) => {
            setLabelWidth(width);
          }}
          style={{
            position: "absolute",
            left: deviceWidth / 2 - labelWidth / 2,
            textAlign: "center",
            fontSize: 25,
          }}
        >
          {`${label}\n${value}`}
          {isPrecentage ? "%" : ""}
        </Text>
      </View>

      <Button
        type="primary"
        size="small"
        style={{
          backgroundColor: "steelblue",
          //   width: "10%",
          alignSelf: "flex-end",
          marginRight: 20,
          marginTop: -50,
        }}
        onPress={() => {
          setIsPrecentage(!isPrecentage);
        }}
      >
        {isPrecentage ? "%" : "value"}
      </Button>
    </View>
  );
};

export default PieChartWithDynamicSlices;
