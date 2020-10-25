import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HeaderText from "../components/HeaderText";
import { List } from "@ant-design/react-native";
import { clearAll } from "../actions";
import { useDispatch } from "react-redux";
import { Modal, Toast } from "@ant-design/react-native";

const SettingScreen = () => {
  const dispatch = useDispatch();

  const onClear = () => {
    dispatch(clearAll());
    Toast.success("Clear success!");
  };

  const onClearComfirm = () => {
    Modal.alert("Are you sure?", "This operation could not be reverted.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Delete", onPress: onClear },
    ]);
  };

  return (
    <View style={styles.screen}>
      <HeaderText style={{ margin: 20 }}>Setting</HeaderText>
      <ScrollView>
        <List>
          <List.Item onPress={onClearComfirm}>Clear All Data</List.Item>
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
