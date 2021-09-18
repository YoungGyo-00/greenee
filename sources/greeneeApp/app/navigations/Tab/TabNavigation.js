import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../../screens/HomeScreen';
import RecordScreen from '../../screens/RecordScreen';
import MissionScreen from '../../screens/MissionScreen';
import CommunityScreen from '../../screens/CommunityScreen';
import ProfileScreen from '../../screens/ProfileScreen';

import { COLOR } from '../../config/styles';
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <NavigationContainer>
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
          component={RecordScreen} />
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
          component={MissionScreen} />
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
          component={CommunityScreen} />
        <Tab.Screen
          name="프로필"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="person-outline" color={color} size={size} />
            ),
          }}
          component={ProfileScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabNavigation;