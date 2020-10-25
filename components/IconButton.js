import React from "react";
import { Icon } from "@ant-design/react-native";
import { TouchableOpacity, Text } from "react-native";

const IconButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Icon name={props.name} size={props.size} color={props.color || "#000"} />
    </TouchableOpacity>
  );
};

export default IconButton;
