import React, { useEffect, useState } from "react";
import { View, ScrollView } from 'react-native';
import Campaign from "../assets/Components/Campaign";
import SearchBar from "../assets/Components/SearchBar";

const CampaignScreen = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      let response = [
        {
          title: '제 24회 프리플로깅 in Daejeon',
          content: '주최 : Greenee / 어느 기업',
          day: 12,
          img: ''
        },
        {
          title: '2021 길거리 쓰레기 제로 캠페인',
          content: '주최 : Greenee / 어느 기업',
          day: 12,
          img: ''

        },
        {
          title: '대한민국 플라스틱 제로 달리기',
          content: '주최 : Greenee / 어느 기업',
          day: 22,
          img: ''
        },
        {
          title: '한강공원 달리며 줍깅',
          content: '주최 : Greenee / 어느 기업',
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
