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
              key={item.value}
              extra={select === item ? "✓" : ""}
              onPress={() => {
                props.navigation.navigate("Record", { selectedTimer: item });
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
