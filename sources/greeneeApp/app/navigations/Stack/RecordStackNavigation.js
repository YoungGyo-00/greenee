import React, { useMemo, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RecordScreen from '../../screens/RecordScreen';


import { COLOR } from '../../config/styles';
import RecoredResult from '../../assets/Components/RecordResult';

const RecordStackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="리스트"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="리스트"
        component={RecordScreen}
      />
      <Stack.Screen
        name="결과"
        component={RecoredResult}
      />
    </Stack.Navigator>
  );
}

export default RecordStackNavigation;