/* tslint:disable:no-console */
import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import HeaderText from "../components/HeaderText";
import IconButton from "../components/IconButton";
import ColorSlider from "../components/ColorSlider";

const CreateTimerScreen = (props) => {
  const [timerName, setTimerName] = useState("");
  const [complete, setComplete] = useState(false);
  const [color, setColor] = useState("steelblue");

  useEffect(() => {
    setComplete(Boolean(timerName));
  }, [timerName]);

  return (
    <TouchableOpacity style={styles.screen} onPress={() => Keyboard.dismiss()}>
      <View style={styles.header}>
        <HeaderText>New</HeaderText>
        <View style={styles.buttonGroup}>
          <IconButton
            name="close"
            size="lg"
            color="#000"
            onPress={() => props.navigation.navigate("Home")}
          >
            Back
          </IconButton>
          {complete && (
            <IconButton
              name="check"
              size="lg"
              color="#000"
              onPress={() => props.navigation.navigate("Home")}
            >
              Back
            </IconButton>
          )}
        </View>
      </View>

      <View>
        <TextInput
          rows={4}
          multiline={true}
          textAlignVertical="top"
          style={{ ...styles.textInput, backgroundColor: color }}
          value={timerName}
          onChangeText={(text) => {
            setTimerName(text);
          }}
          autoFocus={true}
          placeholder="Timer Name"
        ></TextInput>

        <ColorSlider
          defaultColor="steelblue"
          onColorChange={(color) => {
            setColor(color);
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
  },
  textInput: {
    padding: 10,
    height: 150,
    backgroundColor: "steelblue",
    fontSize: 30,
    color: "white",
  },
  buttonGroup: {
    flexDirection: "row",
  },
});

export default CreateTimerScreen;
