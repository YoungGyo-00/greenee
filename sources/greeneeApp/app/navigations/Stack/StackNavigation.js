import React, { useMemo, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import loginContext from '../../context/Context';
import SignInScreen from '../../screens/SignInScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import TabNavigation from '../Tab/TabNavigation';

const StackNavigation = () => {
  const [loginToken, setLoginToken] = useState(false);
  const value = useMemo(() => ({ loginToken, setLoginToken }), [loginToken, setLoginToken]);

  const Stack = createNativeStackNavigator();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'rgb(255,255,255)',
    },
  };

  return (
    <loginContext.Provider value={value}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {
            loginToken ?
              <Stack.Screen name="Tab" component={TabNavigation} />
              :
              <>
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
              </>
          }


        </Stack.Navigator>
      </NavigationContainer>
    </loginContext.Provider>
  )

}

export default StackNavigation;