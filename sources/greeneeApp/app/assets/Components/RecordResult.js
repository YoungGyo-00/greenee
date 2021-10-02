import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from "react-native";
import MapView, { Polyline, PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

import { COLOR } from "../../config/styles";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontWeight: '500',
    fontSize: 16
  },
  header: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  button: {
    backgroundColor: COLOR.MAIN,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    borderRadius: 10
  },
  buttonText: {
    color: 'white'
  },
  body: {
    height: 300,
    marginBottom: 20,
  },
  tail: {
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
  },
  imageContainer: {
    flexDirection: 'row',
  },

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
  const navigation = useNavigation();
  console.log(route.params.src[0].src)
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
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
        <View>
          <TouchableOpacity onPress={async () => {
            try {
              await AsyncStorage.removeItem(route.params.key);
              navigation.goBack();
            } catch (error) {
              console.log(error);
              Alert.alert('실패', '삭제 중 오류가 발생하였습니다. 다시 시도해 주세요!');
            }
          }} style={styles.button}>
            <Text style={styles.buttonText}>삭제하기</Text>
          </TouchableOpacity>
        </View>

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
          {
            route.params.src.map((item,key)=>{
              if(item.latitude != 0){
                return <Marker key={key} coordinate={{latitude: item.latitude, longitude: item.longitude}}/>
              }
            })
          }
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
      <ScrollView style={styles.imageContainer} horizontal={true}>
        {route.params.src.map((item, key)=>{
          return <Image source={{ uri: "data:image/png;base64,"+ item.src }} key={key} style={{ width: 100, height: 160, resizeMode: "contain", marginRight: 10}} />
        })}
        
      </ScrollView>
    </ScrollView>
  )
};

export default RecoredResult;