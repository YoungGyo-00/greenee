import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { COLOR } from "../config/styles";
import CampaignScreen from "./CampaignScreen";
import GroupScreen from "./GroupScreen";

const Tab = createMaterialTopTabNavigator();

const CommunityTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: COLOR.MAIN },
      }}
    >
      <Tab.Screen name="캠페인" component={CampaignScreen} />
      <Tab.Screen name="그룹" component={GroupScreen} />
    </Tab.Navigator>
  );
}

export default CommunityTab;