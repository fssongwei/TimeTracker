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
import { Toast } from "@ant-design/react-native";

const CreateTimerScreen = (props) => {
  const { mode, addTimer, editTimer, oldTimer } = props.route.params;
  const [timerName, setTimerName] = useState(
    mode === "new" ? "" : oldTimer.name
  );
  const [complete, setComplete] = useState(false);
  const [color, setColor] = useState(
    mode === "new" ? "steelblue" : oldTimer.color
  );

  useEffect(() => {
    setComplete(Boolean(timerName));
  }, [timerName]);

  const onAdd = async () => {
    try {
      await addTimer({
        name: timerName,
        color: color,
      });
      props.navigation.navigate("Home");
    } catch (error) {
      Toast.fail(error.toString());
    }
  };

  const onEdit = async () => {
    try {
      await editTimer(oldTimer.id, {
        name: timerName,
        color: color,
      });
      props.navigation.navigate("Home");
    } catch (error) {
      Toast.fail(error.toString());
    }
  };

  return (
    <TouchableOpacity style={styles.screen} onPress={() => Keyboard.dismiss()}>
      <View style={styles.header}>
        <HeaderText>{mode === "new" ? "New" : "Edit"}</HeaderText>
        <View style={styles.buttonGroup}>
          <IconButton
            name="close"
            size="lg"
            color="#000"
            onPress={() => props.navigation.navigate("Home")}
          />
          {complete && (
            <IconButton
              name="check"
              size="lg"
              color="#000"
              onPress={mode === "new" ? onAdd : onEdit}
            />
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
