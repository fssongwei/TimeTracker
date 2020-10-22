import React from "react";
import { ScrollView, Text, StyleSheet, View, Space } from "react-native";
import SummaryGroup from "../groups/SummaryGroup";
import TrendGroup from "../groups/TrendGroup";
import NavigationContext from "../hooks/NavigationContext";

const AnalysisScreen = (props) => {
  return (
    <ScrollView style={styles.screen}>
      <NavigationContext.Provider value={props.navigation}>
        <SummaryGroup />
      </NavigationContext.Provider>
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
