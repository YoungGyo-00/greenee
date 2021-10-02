import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';

import Record from "../assets/Components/Record";

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  containerHeaderText: {
    fontSize: 16,
    marginBottom: 10
  }
});

const RecordScreen = () => {
  const [data, setData] = useState([]);


  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          await AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
              setData(stores);
            });
          });
        } catch (error) {
          console.log(error);
          Alert.alert('오류', '저장된 데이터를 불러오는데 실패하였습니다.');
        }
      };
      getData();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.containerHeaderText}>최근 활동</Text>
      {data.map((item, key) => {
        if (item[0].split('2021')[0] == 'record') {
          return <Record key={key} data={item} />
        }
      })}
    </ScrollView>
  );
}

export default RecordScreen;
