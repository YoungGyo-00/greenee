import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Record from "../assets/Components/Record";

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  containerHeaderText:{
    fontSize: 16,
    marginBottom: 10
  }
});

const RecordScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      // let response = await AsyncStorage.getItem('record');
      let response = [
        {
          distance: 5.4,      // km단위
          elapsedTime: 2400,   // 초단위
          date: 1632472468608, // 밀리세컨드 단위
          path: []
        },
        {
          distance: 6.2,      // km단위
          elapsedTime: 3260,   // 초단위
          date: 1622471468608, // 밀리세컨드 단위
          path: []
        },
        {
          distance: 2.4,      // km단위
          elapsedTime: 1000,   // 초단위
          date: 1632432462608, // 밀리세컨드 단위
          path: []
        }
      ];
      setData(response);
    }
    getData();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.containerHeaderText}>최근 활동</Text>
      {data.map((item, key) => {
        return <Record key={key} data={item}/>
      })}
    </ScrollView>
  );
}

export default RecordScreen;