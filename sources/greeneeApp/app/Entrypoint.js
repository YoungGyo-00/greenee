import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import Navigator from './navigations/';
const App = () => {
  console.log('Entrypoint');
  return(
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar/>
      <Navigator/>
    </SafeAreaView>
  );
}
export default App;