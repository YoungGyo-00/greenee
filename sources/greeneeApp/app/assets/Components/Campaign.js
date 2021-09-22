import React from "react";
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLOR } from "../../config/styles";

const styles = StyleSheet.create({
  container: {
    height: 150,
    padding: 10,
    backgroundColor: "#ffffff",
    marginBottom: 5
  },
  header: {
    height: 100,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  tail: {
    height: 50,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "space-around"
  },
  contentsWrapper:{
    flex: 1,
    justifyContent: "space-around"
  },
  title: {
    fontWeight: "800",
    fontSize: 16
  },
  content: {
    fontSize: 14,
    color: '#3b3b3b'
  },
  day: {
    fontWeight: "800",
    fontSize: 12,
    color: COLOR.MAIN
  },
  imageWrapper:{
    flex: 1
  },
  image:{
    width: 50,
    height: 90
  }
});

const Campaign = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.contentsWrapper}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.content}>{data.content}</Text>
          <Text style={styles.day}>D-{data.day}</Text>
        </View>
        <View style={styles.imgWrapper}>
          <Image
            source={require('../img/GREENEEText.png')}
            style={styles.image} />
        </View>
      </View>
      <View style={styles.tail}>
        <Text>소개</Text>
        <Text>팀원모집</Text>
        <Text>댓글</Text>
      </View>
      <Text>{data.title}</Text>
    </View>
  );
}

export default Campaign;