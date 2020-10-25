import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import RecordScreen from "../screen/RecordScreen";
import Filter from "../groups/Filter";
import Calendar from "../groups/Calendar";
import AddRecordScreen from "../screen/AddRecordScreen";

const Stack = createStackNavigator();

const RecordNavigator = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Main"
        component={RecordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Filter" component={Filter} />
      <Stack.Screen name="Calendar" component={Calendar} />
      <Stack.Screen name="Add Record" component={AddRecordScreen} />
    </Stack.Navigator>
  );
};

export default RecordNavigator;
