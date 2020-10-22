import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AnalysisScreen from "../screen/AnalysisScreen";
import RecordScreen from "../screen/RecordScreen";

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
    </Stack.Navigator>
  );
};

export default AnalysisNavigator;
