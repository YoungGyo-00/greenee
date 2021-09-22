import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";

import SearchBar from "../assets/Components/SearchBar";
import Group from "../assets/Components/Group";

const GroupScreen = () => {
  const [data, setData] = useState([]);
  useEffect(()=>{
    const getData = () => {
      let response = [
        {
          title: '모두의 간호',
          count: 23,
          group: '기타',
          explanation: '간호학과 학생들만의 고민, 정보 공유',
        },
        {
          title: '아재 개그',
          count: 79,
          group: '친목 / 유머',
          explanation: '아재요...',
        },
        {
          title: '모두의 그림',
          count: 67,
          group: '문화 / 취미',
          explanation: '일상드로잉',
        },
        {
          title: '자취생 모임',
          count: 324,
          group: '대학생활',
          explanation: '자취생들의 고민, 팁, 다같이 공유해봐요~~~',
        },
      ];
      setData(response);
    }
    getData();
  },[]);
  return (
    <ScrollView>
      <SearchBar/>
      <View style={{
        backgroundColor: "#ccc",
      }}>
        {
          data.map((item, key) => {
            return <Group data={item} key={key} />
          })
        }
      </View>
    </ScrollView>
  );
}

export default GroupScreen;