import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PieChart from "../components/PieChart";
import { SegmentedControl } from "@ant-design/react-native";

const SummaryGroup = () => {
  return (
    <View>
      <Text style={styles.title}>Summary</Text>
      <View style={{ padding: 20 }}>
        <SegmentedControl
          selectedIndex={1}
          values={["Today", "This Week", "This Month", "This Year"]}
        />
      </View>
      <PieChart />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "500",
    padding: 20,
  },
});

export default SummaryGroup;
