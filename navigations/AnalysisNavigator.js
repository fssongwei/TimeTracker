import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AnalysisScreen from "../screen/AnalysisScreen";
import RecordScreen from "../screen/RecordScreen";
import Filter from "../groups/Filter";
import Calendar from "../groups/Calendar";

const Stack = createStackNavigator();

const AnalysisNavigator = () => {
  return (
    <Stack.Navigator
      //   screenOptions={{
      //     headerShown: false,
      //   }}
      mode="modal"
    >
      <Stack.Screen
        name="Analysis"
        component={AnalysisScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Record" component={RecordScreen} />
      <Stack.Screen name="Filter" component={Filter} />
      <Stack.Screen name="Calendar" component={Calendar} />
    </Stack.Navigator>
  );
};

export default AnalysisNavigator;
