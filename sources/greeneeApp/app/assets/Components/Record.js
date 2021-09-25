import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: '#e1e1e1',
    borderBottomWidth: 2,
    borderRightWidth: 3,
    borderTopWidth: 0.4,
    borderLeftWidth: 0.4,
    marginBottom: 10,
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
  let date = new Date(data.date);
  let velocity = (data.distance / data.elapsedTime * 3600).toFixed(2);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {
            date.getFullYear() + '년 '
            + date.getMonth() + '월 '
            + date.getDay() + '일 '
            + date.getHours() + '시 '
            + date.getMinutes() + '분'
          }
        </Text>
        <TouchableOpacity>
          <Icon name="ellipsis-horizontal-outline" size={16}></Icon>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.items}>
          <Text style={styles.content}>{data.distance}</Text>
          <Text style={styles.unit}>Km</Text>
        </View>
        <View style={styles.items}>
          <Text style={styles.content}>{velocity}</Text>
          <Text style={styles.unit}>Km/h</Text>
        </View>
        <View style={styles.items}>
          <Text style={styles.content}>{covertSec(data.elapsedTime)}</Text>
          <Text style={styles.unit}>시간</Text>
        </View>
      </View>
    </View>
  );
}

export default Record;