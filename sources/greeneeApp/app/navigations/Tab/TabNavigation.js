import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import MissionTab from '../../screens/MissionTab';
import HomeScreen from '../../screens/HomeScreen';
import CommunityTab from '../../screens/CommunityTab';
import ProfileScreen from '../../screens/ProfileScreen';
import RecordStackNavigation from '../Stack/RecordStackNavigation';

import { COLOR } from '../../config/styles';
const Tab = createBottomTabNavigator();

const TabNavigation = () => {

  return (
      <Tab.Navigator
        initialRouteName="홈"
        screenOptions={
          {
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: COLOR.WHITE,
            tabBarActiveBackgroundColor: COLOR.MAIN,
            tabBarInactiveTintColor: COLOR.MAIN_BLUR,
            tabBarInactiveBackgroundColor: COLOR.MAIN,
            tabBarHideOnKeyboard: true,
          }
        }
      >
        <Tab.Screen
          name="기록"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="analytics-outline" color={color} size={size} />
            ),
          }}
          component={RecordStackNavigation} />
        <Tab.Screen
          name="미션"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="mail-outline" color={color} size={size} />
            ),
            tabBarBadge: 1,
            tabBarBadgeStyle: {
              color: "#fff",
              fontSize: 10,
            }
          }}
          component={MissionTab} />
        <Tab.Screen
          name="홈"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="location-outline" color={color} size={size} />
            ),
          }}
          component={HomeScreen} />
        <Tab.Screen
          name="커뮤니티"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="earth-outline" color={color} size={size} />
            ),
          }}
          component={CommunityTab} />
        <Tab.Screen
          name="프로필"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="person-outline" color={color} size={size} />
            ),
          }}
          component={ProfileScreen} />

      </Tab.Navigator>
  );
}

export default TabNavigation;