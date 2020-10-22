import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TimerListScreen from "../screen/TimerListScreen";
import CreateTimerScreen from "../screen/CreateTimerScreen";
import TimerScreen from "../screen/TimerScreen";

const Stack = createStackNavigator();

const TimerNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      mode="modal"
    >
      <Stack.Screen name="Home" component={TimerListScreen} />
      <Stack.Screen name="Create" component={CreateTimerScreen} />
    </Stack.Navigator>
  );
};

export default TimerNavigator;
