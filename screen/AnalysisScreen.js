import React from "react";
import { ScrollView, Text, StyleSheet, View, Space } from "react-native";
import SummaryGroup from "../groups/SummaryGroup";
import TrendGroup from "../groups/TrendGroup";

const AnalysisScreen = (props) => {
  return (
    <ScrollView style={styles.screen}>
      <SummaryGroup />
      <TrendGroup />
      <View style={{ height: 100 }}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: 50,
    backgroundColor: "#fff",
  },
});

export default AnalysisScreen;
