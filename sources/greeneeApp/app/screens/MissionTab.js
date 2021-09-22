import React from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MissionDoingScreen from './MissionDoingScreen';
import MissionToDoScreen from './MissionToDoScreen';
import MissionDoneScreen from './MissionDoneScreen';
import { COLOR } from "../config/styles";

const Tab = createMaterialTopTabNavigator();

const MissionTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: COLOR.MAIN },
      }}
    >
      <Tab.Screen name="진행중" component={MissionDoingScreen} />
      <Tab.Screen name="진행가능" component={MissionToDoScreen} />
      <Tab.Screen name="미션완료" component={MissionDoneScreen} />
    </Tab.Navigator>
  );
}

export default MissionTab;