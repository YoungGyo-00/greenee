import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Navigator from './navigations/';
const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    console.log('useEffect');
  }, [])
  console.log('Entrypoint');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <Navigator />
    </SafeAreaView>
  );
}
export default App;