import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { List } from "@ant-design/react-native";
const Item = List.Item;

const Filter = (props) => {
  const { data, select } = props.route.params;
  return (
    <View style={styles.screen}>
      <List>
        {data.map((item) => {
          return (
            <Item
              extra={select === item ? "✓" : ""}
              onPress={() => {
                props.navigation.navigate("Record", { select: item });
              }}
            >
              {item.name}
            </Item>
          );
        })}
      </List>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#fff",
    flex: 1,
    paddingVertical: 30,
  },
});
