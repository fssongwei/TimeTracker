import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
// import { Picker } from "@react-native-community/picker";
import ColorCard from "../components/ColorCard";
import { Picker, Button, Icon } from "@ant-design/react-native";

const RecordCard = () => {
  return (
    <ColorCard
      color="steelblue"
      round
      style={{ width: "96%", marginHorizontal: "2%", marginVertical: 5 }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={styles.cardLabel}>Learning</Text>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={{ color: "white", fontSize: 40 }}>3.7</Text>
            <Text style={{ color: "white" }}>Hours</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "#fff" }}>9:01 AM - 11:39 AM</Text>
        </View>
      </View>
    </ColorCard>
  );
};

const RecordScreen = () => {
  const [selectedTimer, setSelectedTimer] = useState("All");

  return (
    <View style={styles.screen}>
      <View>
        <Picker
          data={[
            { label: "All", value: "All" },
            { label: "learning", value: "learning" },
            { label: "sport", value: "sport" },
          ]}
          cols={1}
          onChange={(value) => {
            setSelectedTimer(value);
          }}
        >
          <Button>
            <Icon name="filter" size="xs" />
            {selectedTimer}
          </Button>
        </Picker>
      </View>

      <ScrollView>
        <RecordCard />
        <RecordCard />
        <RecordCard />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
  },
  cardLabel: {
    fontSize: 20,
    color: "#fff",
  },
});

export default RecordScreen;
