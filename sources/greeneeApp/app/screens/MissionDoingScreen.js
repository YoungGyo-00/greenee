import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  missionList: {
    marginBottom: 20
  },
  missionHeader: {
    fontSize: 18,
    marginBottom: 20,
  },
  mission: {
    padding: 10,
    fontSize: 16,
    height: 44,
    borderBottomWidth: 0.5
  }
});

const MissionDoingScreen = () => {
  const [ploggingMissions, setPloggingMissions] = useState([]);
  const [temporaryMissions, setTemporaryMissions] = useState([]);

  const renderItem = ({ item, index }) => {
    return (
      <Text style={styles.mission} onPress={()=>{
        Alert.alert('알림', '선택한 미션을 완료하셨습니까?',
        [
          {
            text: '예',
            onPress: async()=>{
              if(item.type === 'plogging') {
                let spliceArray = [...ploggingMissions];
                setPloggingMissions(spliceArray);
                spliceArray.splice(index, 1);
                let missionDoing = {
                  ploggingMissions: spliceArray,
                  temporaryMissions: temporaryMissions
                };
                await AsyncStorage.setItem('missionDoing', JSON.stringify(missionDoing));
                let missionDone = await AsyncStorage.getItem('missionDone');
                let missionDoneJSON = missionDone === null ? { ploggingMissions: [], temporaryMissions: [] } : JSON.parse(missionDone);
                missionDoneJSON.ploggingMissions.push(item);
                await AsyncStorage.setItem('missionDone', JSON.stringify(missionDoneJSON));
      
              } else {
                let spliceArray = [...temporaryMissions];
                spliceArray.splice(index, 1);
                setTemporaryMissions(spliceArray);
                let missionDoing = {
                  ploggingMissions: ploggingMissions,
                  temporaryMissions: spliceArray
                };
                await AsyncStorage.setItem('missionDoing', JSON.stringify(missionDoing));
                let missionDone = await AsyncStorage.getItem('missionDone');
                let missionDoneJSON = missionDone === null ? { ploggingMissions: [], temporaryMissions: [] } : JSON.parse(missionDone);
                missionDoneJSON.temporaryMissions.push(item);
                await AsyncStorage.setItem('missionDone', JSON.stringify(missionDoneJSON));
      
              }
            }
          },
          {
            text: '아니요'
          }
        ]
        );
      }}>{item.title}</Text>
    );
  }

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        let response = await AsyncStorage.getItem('missionDoing');
        let responseJSON = JSON.parse(response === null ? JSON.stringify({ ploggingMissions: [], temporaryMissions: [] }) : response);
        setPloggingMissions(responseJSON.ploggingMissions);
        setTemporaryMissions(responseJSON.temporaryMissions);
      }
      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View styles={styles.missionList}>
        <View>
          <Text style={styles.missionHeader}>플로깅 미션</Text>
        </View>
        <View styles={styles.missionBody}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 20 }}
            data={ploggingMissions}
            renderItem={renderItem}
            keyExtractor={(item, key) => key.toString()}
          />
        </View>
      </View>
      <View styles={{ marginTop: 30 }}>
        <View>
          <Text style={styles.missionHeader}>시스템 미션</Text>
        </View>
        <View styles={styles.missionBody}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 20 }}
            data={temporaryMissions}
            renderItem={renderItem}
            keyExtractor={(item, key) => key.toString()}
          />
        </View>
      </View>
    </View>
  );
}

export default MissionDoingScreen;