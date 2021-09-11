import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import BackgroundGeolocation from "react-native-background-geolocation";
const App = () => {
  useEffect(()=>{
    BackgroundGeolocation.onLocation((location) => {
      console.log("[onLocation] success: ", location);
    }, (error) => {
      console.log("[onLocation] ERROR: ", error);
    });
    BackgroundGeolocation.ready({
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      stopOnTerminate: false,
      startOnBoot: true,
      url: "http://your.server.com",
      headers: {
       "my-auth-token": "secret-token"
      }
    }).then((state) => {
     console.log("[ready] success", state);
    });

  },[]);
  return (
    <View>
      <Button title="asdf" onPress={()=>{
        console.log('asdf');
        BackgroundGeolocation.start().then((state) => {
          console.log("[start] success - ", state);
          BackgroundGeolocation.changePace(true);
        });
      }}></Button>
    </View>
  );
};

export default App;
