import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const MissionDoneScreen = () => {
  const [ploggingMissions, setPloggingMissions] = useState([]);
  const [temporaryMissions, setTemporaryMissions] = useState([]);

  const renderItem = ({item, index}) => {
    return (
      <Text style={styles.mission}>{item.title}</Text>
    );
  }

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        let response = await AsyncStorage.getItem('missionDone');
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

export default MissionDoneScreen;