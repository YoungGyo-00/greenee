import React, { useEffect } from "react";
import { View, ScrollView } from 'react-native';
import { useState } from "react/cjs/react.development";
import Campaign from "../assets/Components/Campaign";
import SearchBar from "../assets/Components/SearchBar";

const CampaignScreen = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      let response = [
        {
          title: '제 25회 서울시 환경사진 공모전(~9/24 연장)',
          content: '서울특별시',
          day: 12,
          img: ''
        },
        {
          title: '2021 유튜브 영상 공모전',
          content: '한국외국어대학교 중남미 연구소 HK+ 사업단 지역인..',
          day: 12,
          img: ''

        },
        {
          title: '도시 소음 절감을 위한 해커톤 대회',
          content: '주최 : 과학기술정보부 / 한국지능정보사회진흥원',
          day: 22,
          img: ''
        },
        {
          title: '도시 소음 절감을 위한 해커톤 대회',
          content: '주최 : 과학기술정보부 / 한국지능정보사회진흥원',
          day: 22,
          img: ''
        }
      ];
      setData(response);
    }
    getData();
  }, []);

  return (
    <ScrollView>
      <SearchBar value={value} setValue={setValue} />
      <View style={{
        backgroundColor: "#ccc",
      }}>
        {
          data.map((item, key) => {
            return <Campaign data={item} key={key} />
          })
        }
      </View>

    </ScrollView>
  );
}

export default CampaignScreen;