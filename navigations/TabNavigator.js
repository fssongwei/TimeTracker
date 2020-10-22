import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TimerNavigator from "../navigations/TimerNavigator";
import AnalysisScreen from "../screen/AnalysisScreen";
import SettingScreen from "../screen/SettingScreen";
import { Icon } from "@ant-design/react-native";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "steelblue",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Timers"
        component={TimerNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name="clock-circle"
                color={focused ? "steelblue" : "grey"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Analysis"
        component={AnalysisScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon name="area-chart" color={focused ? "steelblue" : "grey"} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon name="setting" color={focused ? "steelblue" : "grey"} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
