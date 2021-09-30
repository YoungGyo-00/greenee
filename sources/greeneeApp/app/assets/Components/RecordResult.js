import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

import { COLOR } from "../../config/styles";
const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 15,
  },
  title: {
    fontWeight: '500',
    fontSize: 16
  },
  header:{
    marginBottom: 15,
  }, 
  body:{
    height: 300,
    marginBottom: 20,
  },
  tail:{
    flexDirection: 'row',
    justifyContent: "space-around",
    height: 50,
    alignItems: 'center'
  },
  items: {
    alignItems: 'center'
  },
  content: {
    fontSize: 16
  },
  unit: {
    fontSize: 11,
    color: '#5d5d5d',
  }

})
const covertSec = (sec) => {
  let hours = parseInt(sec / 3600);
  let minutes = parseInt((sec % 3600) / 60);
  let seconds = sec % 60;

  return (hours.toString().length == 1 ? "0" + hours : hours) + ":"
    + (minutes.toString().length == 1 ? "0" + minutes : minutes) + ":"
    + (seconds.toString().length == 1 ? "0" + seconds : seconds);

  // return hours+":" + minutes+":"+seconds;
}

const RecoredResult = ({ route }) => {
  console.log('[route.params] : ', route.params);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {
            route.params.date.substring(0, 4) + '년 '
            + route.params.date.substring(4, 6) + '월 '
            + route.params.date.substring(6, 8) + '일 '
            + route.params.date.substring(8, 10) + '시 '
            + route.params.date.substring(10, 12) + '분'
          }의 경로
        </Text>
      </View>
      <View style={styles.body}>
        <MapView
          style={styles.container}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: route.params.path[0].latitude,
            longitude: route.params.path[0].longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }} >
          <Polyline
            coordinates={route.params.path}
            strokeColor={COLOR.MAIN}
            strokeWidth={7}
          />
        </MapView>
      </View>
      <View style={styles.tail}>
        <View style={styles.items}>
          <Text style={styles.unit}>이동거리</Text>
          <Text style={styles.content}>{route.params.distance}</Text>
          <Text style={styles.unit}>Km</Text>
        </View>
        <View style={styles.items}>
          <Text style={styles.unit}>속도</Text>
          <Text style={styles.content}>{(route.params.distance / route.params.elapsedTime * 3600).toFixed(2)}</Text>
          <Text style={styles.unit}>Km/h</Text>
        </View>
        <View style={styles.items}>
        <Text style={styles.unit}>시간</Text>
          <Text style={styles.content}>{covertSec(route.params.elapsedTime)}</Text>
          <Text style={styles.unit}>hh:mm:ss</Text>
        </View>
      </View>
    </ScrollView>
  )
};

export default RecoredResult;