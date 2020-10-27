import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import TimerScreen from "../screen/TimerScreen";
import TermScreen from "../screen/TermScreen";

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Timer"
          component={TimerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Term" component={TermScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
