import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "@ant-design/react-native";
import ColorCard from "../components/ColorCard";
import HeaderText from "../components/HeaderText";

const TrendGroup = () => {
  return (
    <View style={styles.group}>
      <HeaderText style={styles.title}>Trend</HeaderText>

      <ColorCard color="steelblue">
        <Icon name="up-circle" size={50} />
        <View style={{ paddingLeft: 20 }}>
          <Text style={styles.cardLabel}>Learning</Text>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={{ color: "white", fontSize: 40 }}>3.7</Text>
            <Text style={{ color: "white" }}>Hours / Day</Text>
          </View>
        </View>
      </ColorCard>

      <ColorCard color="lightgreen">
        <Icon name="down-circle" size={50} />
        <View style={{ paddingLeft: 20 }}>
          <Text style={styles.cardLabel}>Learning</Text>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={{ color: "white", fontSize: 40 }}>3.7</Text>
            <Text style={{ color: "white" }}>Hours / Day</Text>
          </View>
        </View>
      </ColorCard>

      <ColorCard color="pink">
        <Icon name="down-circle" size={50} />
        <View style={{ paddingLeft: 20 }}>
          <Text style={styles.cardLabel}>Learning</Text>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={{ color: "white", fontSize: 40 }}>3.7</Text>
            <Text style={{ color: "white" }}>Hours / Day</Text>
          </View>
        </View>
      </ColorCard>
    </View>
  );
};

const styles = StyleSheet.create({
  group: {
    marginVertical: 30,
  },
  title: {
    padding: 20,
  },
  card: {
    width: "100%",
    height: 100,
    backgroundColor: "steelblue",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 15,
  },
  cardLabel: {
    fontSize: 20,
    color: "#fff",
  },
});

export default TrendGroup;
