import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Button,
} from "react-native";
import HeaderText from "../components/HeaderText";
import { List } from "@ant-design/react-native";
import { clearAll } from "../actions";
import { useDispatch } from "react-redux";
import { Modal, Toast } from "@ant-design/react-native";
import * as StoreReview from "react-native-store-review";

const SettingScreen = ({ navigation }) => {
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
        <List style={{ marginTop: 20 }}>
          <List.Item extra="1.0.0">Current Version</List.Item>
          <List.Item
            onPress={() => Linking.openURL("https://timetracker.wei.ai")}
          >
            About App
          </List.Item>
          <List.Item onPress={() => Linking.openURL("https://wei.ai")}>
            About Author
          </List.Item>
          <List.Item
            onPress={() => Linking.openURL("mailto:ws446@cornell.edu")}
          >
            Contact Us
          </List.Item>
          <List.Item
            onPress={() => {
              navigation.navigate("Term");
            }}
          >
            Terms Of Service
          </List.Item>

          <List.Item
            onPress={() => {
              if (StoreReview.isAvailable) {
                StoreReview.requestReview();
              }
            }}
          >
            Leave A Review
          </List.Item>
        </List>

        <List style={{ marginTop: 50 }}>
          <List.Item onPress={onClearComfirm}>
            <Text
              style={{
                fontSize: 18,
                color: "red",
                width: "100%",
                textAlign: "center",
              }}
            >
              Clear All Data
            </Text>
          </List.Item>
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
