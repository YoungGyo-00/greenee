import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/* const DUMMY_DATA = [
  {
    latitude: "36.6029863",
    longitude: "126.5489114",
    img: "https://cfile181.uf.daum.net/image/250649365602043421936D",
    time: "20211213042346",
    id: "이영교",
  },
  {
    latitude: "36.6029863",
    longitude: "128.5389114",
    img: "https://cfile181.uf.daum.net/image/250649365602043421936D",
    time: "20201112042346",
    id: "최동준",
  },
  {
    latitude: "36.6029863",
    longitude: "126.5489114",
    img: "https://cfile181.uf.daum.net/image/250649365602043421936D",
    time: "20211213042346",
    id: "이영교",
  },
  {
    latitude: "34.6029863",
    longitude: "126.5389114",
    img: "https://cfile181.uf.daum.net/image/250649365602043421936D",
    time: "20201112042346",
    id: "지상은",
  },
  {
    latitude: "35.6029863",
    longitude: "126.5389114",
    img: "https://cfile181.uf.daum.net/image/250649365602043421936D",
    time: "20201112042346",
    id: "지상은",
  },
]; */

const Chart = () => {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get("http://39.117.55.147/user/getAllData");
      makeData(res.data);
    };

    const makeData = async (items) => {
      const date = new Date(items[0].timeStamp);
      const first_time = date.getFullYear() + '년' + date.getMonth() + '월';
      const arr = [{
        time: first_time,
        count: 1
      }];

      for (let i=1; i<items.length; i++){
        let date = new Date(items[i].timeStamp);
        const time = date.getFullYear() + '년' + date.getMonth() + '월';
        for (let j=0; j<i; j++) {
          if (time === arr[j].time) {
            arr[j].count += 1;
            arr.sort((a,b) => {
              return (a.time.substring(0,2) + a.time.substring(3,5)) - (b.time.substring(0,2) + b.time.substring(3,5));
            })
            break;
          };
          if (j === i-1) {
            arr.push({
              time,
              count: 1
            });
          };
        };
      };
      setData(arr);
    };

    fetchEvents();
    setFlag(true);
  }, []);

  return (
    <ResponsiveContainer width="100%" height="45%">
      {flag && (
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      )}
    </ResponsiveContainer>
  );
};

export default Chart;
