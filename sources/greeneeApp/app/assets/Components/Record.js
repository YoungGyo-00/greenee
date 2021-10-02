import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: '#e1e1e1',
    borderBottomWidth: 2,
    borderRightWidth: 3,
    borderTopWidth: 0.4,
    borderLeftWidth: 0.4,
    marginBottom: 20,
    padding: 15
  },
  header: {
    height: 30,
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 13
  },
  body: {
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
});

const covertSec = (sec) => {
  let hours = parseInt(sec / 3600);
  let minutes = parseInt((sec % 3600) / 60);
  let seconds = sec % 60;

  return (hours.toString().length == 1 ? "0" + hours : hours) + ":"
    + (minutes.toString().length == 1 ? "0" + minutes : minutes) + ":"
    + (seconds.toString().length == 1 ? "0" + seconds : seconds);

  // return hours+":" + minutes+":"+seconds;
}

const Record = ({ data }) => {
  const navigation = useNavigation();

  let date = data[0].split('record')[1];
  let dataJSON = JSON.parse(data[1]);
  let velocity = (dataJSON.distance / dataJSON.elapsedTime * 3600).toFixed(2);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {
            date.substring(0,4) + '년 '
            + date.substring(4,6) + '월 '
            + date.substring(6,8) + '일 '
            + date.substring(8,10) + '시 '
            + date.substring(10,12) + '분'
          }
        </Text>
        <TouchableOpacity onPress={()=>{
          navigation.navigate('결과',{
            key: data[0],
            date: date,
            distance: dataJSON.distance,
            elapsedTime: dataJSON.elapsedTime,
            path: dataJSON.path,
            src: dataJSON.images
          });
        }}>
          <Icon name="ellipsis-horizontal-outline" size={16}></Icon>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.items}>
          <Text style={styles.content}>{dataJSON.distance}</Text>
          <Text style={styles.unit}>Km</Text>
        </View>
        <View style={styles.items}>
          <Text style={styles.content}>{velocity}</Text>
          <Text style={styles.unit}>Km/h</Text>
        </View>
        <View style={styles.items}>
          <Text style={styles.content}>{covertSec(dataJSON.elapsedTime)}</Text>
          <Text style={styles.unit}>시간</Text>
        </View>
      </View>
    </View>
  );
}

export default Record;