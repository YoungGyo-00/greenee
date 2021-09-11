import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../../screens/HomeScreen';
import RecordScreen from '../../screens/RecordScreen';
import MissionScreen from '../../screens/MissionScreen';
import CommunityScreen from '../../screens/CommunityScreen';
import ProfileScreen from '../../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="홈"
        screenOptions={{headerShown: false}}
      >
        <Tab.Screen 
        name="기록" 
        component={RecordScreen} />
        <Tab.Screen 
        name="미션" 
        component={MissionScreen} />
        <Tab.Screen 
        name="홈" 
        component={HomeScreen} />
        <Tab.Screen 
        name="커뮤니티" 
        component={CommunityScreen} />
        <Tab.Screen 
        name="프로필" 
        component={ProfileScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabNavigation;