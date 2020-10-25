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
              key={item.name}
              extra={select.name === item.name ? "✓" : ""}
              onPress={() => {
                props.navigation.navigate("Main", { selected: item });
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
