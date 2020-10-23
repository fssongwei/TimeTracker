import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HeaderText from "../components/HeaderText";
import { List } from "@ant-design/react-native";
import { AsyncStorage } from "react-native";

const onClear = async () => {
  try {
    await AsyncStorage.setItem("TimerList", JSON.stringify([]));
    await AsyncStorage.setItem("RecordList", JSON.stringify([]));
    console.log(true);
  } catch (error) {
    console.log(error);
  }
};

const SettingScreen = () => {
  return (
    <View style={styles.screen}>
      <HeaderText style={{ margin: 20 }}>Setting</HeaderText>
      <ScrollView>
        <List>
          <List.Item onPress={onClear}>Clear All Data</List.Item>
        </List>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 50,
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export default SettingScreen;
