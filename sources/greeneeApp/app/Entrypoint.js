import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Navigator from './navigations/';
import { COLOR } from './config/styles';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLOR.MAIN} />
      <Navigator />
    </SafeAreaView>
  );
}
export default App;