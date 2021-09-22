import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from "react-native";
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

import { COLOR } from '../config/styles';
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
  },
  button: {
    backgroundColor: COLOR.MAIN,
    padding: (5, 10, 5, 10),
  },
  buttonText: {
    color: "#fff",
    textAlign: 'center'
  }
});

const MissionToDoScreen = () => {
  const [ploggingMissions, setPloggingMissions] = useState([]);
  const [temporaryMissions, setTemporaryMissions] = useState([]);
  const getData = async () => {
    try {
      let missionToDoFlag = await AsyncStorage.getItem('missionToDoFlag');
      if (missionToDoFlag === null) {
        let response = {
          ploggingMissions: [
            {
              type: 'plogging',
              title: '1km 플로깅 하기',
              goalDistance: '1'
            },
            {
              type: 'plogging',
              title: '3km 플로깅 하기',
              goalDistance: '3'
            },
          ],
          temporaryMissions: [
            {
              type: 'temp',
              title: '아름다운 가게에 방치된 일회용품 가져다주기',
              count: '1'
            },
            {
              type: 'temp',
              title: '자신의 러닝 스타일과 비슷한 러너와 매칭하기',
              count: '3'
            },
            {
              type: 'temp',
              title: '커뮤니티에 인증샷 남기기',
              count: '1'
            }
          ]
        };
        await AsyncStorage.setItem('missionToDo', JSON.stringify(response));
        setPloggingMissions(response.ploggingMissions);
        setTemporaryMissions(response.temporaryMissions);
        await AsyncStorage.setItem('missionToDoFlag', 'true');
        console.log('mission을 서버에서 받아옵니다.');
      } else {
        let response = await AsyncStorage.getItem('missionToDo');
        let responseJSON = JSON.parse(response);
        setPloggingMissions(responseJSON.ploggingMissions);
        setTemporaryMissions(responseJSON.temporaryMissions);
        console.log('이미 mission이 존재합니다. 로컬에서 불러옵니다.');
      }
    } catch (error) {
      Alert.alert('오류', '미션을 받아오는데 실패하였습니다.');
      console.log(error);
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <Text style={styles.mission} onPress={async () => {
        Alert.alert('알림', '선택된 미션을 진행하시겠습니까?',
          [
            {
              text: '예',
              onPress: async () => {
                if (item.type === 'plogging') {
                  let spliceArray = [...ploggingMissions];
                  spliceArray.splice(index, 1);
                  setPloggingMissions(spliceArray);
                  let missionToDo = {
                    ploggingMissions: spliceArray,
                    temporaryMissions: temporaryMissions
                  }
                  await AsyncStorage.setItem('missionToDo', JSON.stringify(missionToDo));
                  let missionDoing = await AsyncStorage.getItem('missionDoing');
                  let missionDoingJSON = missionDoing === null ? { ploggingMissions: [], temporaryMissions: [] } : JSON.parse(missionDoing);
                  missionDoingJSON.ploggingMissions.push(item);
                  await AsyncStorage.setItem('missionDoing', JSON.stringify(missionDoingJSON));
                } else {
                  let spliceArray = [...temporaryMissions];
                  spliceArray.splice(index, 1);
                  setTemporaryMissions(spliceArray);
                  let missionToDo = {
                    ploggingMissions: ploggingMissions,
                    temporaryMissions: spliceArray
                  }
                  await AsyncStorage.setItem('missionToDo', JSON.stringify(missionToDo));
                  let missionDoing = await AsyncStorage.getItem('missionDoing');
                  let missionDoingJSON = missionDoing === null ? { ploggingMissions: [], temporaryMissions: [] } : JSON.parse(missionDoing);
                  missionDoingJSON.temporaryMissions.push(item);
                  await AsyncStorage.setItem('missionDoing', JSON.stringify(missionDoingJSON));
                }
              }
            },
            {
              text: '아니요'
            }
          ]);
      }}>{item.title}</Text>
    );
  }
  useFocusEffect(
    React.useCallback(() => {
      getData();
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
      <View>
        <View styles={styles.missionList}>
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
      <TouchableOpacity onPress={async () => {
        await AsyncStorage.removeItem('missionDoing');
        await AsyncStorage.removeItem('missionToDoFlag');
        await AsyncStorage.removeItem('missionDone');
        getData();
      }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>미션 상태 초기화 하기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MissionToDoScreen;