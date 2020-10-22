import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PieChart from "../components/PieChart";

const SummaryGroup = () => {
  return (
    <View>
      <Text style={styles.title}>Summary</Text>
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
