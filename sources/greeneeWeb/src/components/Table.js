import React, { useState, useEffect } from "react";
import "../styles/css/Table.css";
import axios from "axios";
const { kakao } = window;

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

const Table = (props) => {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    const fetchEvents = (async () => {
      setData([]);
      const data = await axios.get("http://39.117.55.147/user/getAllData");
      if ('' === props.startDate){
        const res = data;
        for (let i=0; i<res.data.length; i++) {
          await getAddr(res.data[i].latitude, res.data[i].longitude);
        };
      } else {
        const res = data.data.reduce((acc,cur) => {
          const date = new Date(cur.timeStamp);
          const year = date.getFullYear();
          const month = date.getMonth()+1;
          const day = date.getDay();

          const s_year = props.startDate.substring(0,4);
          const s_month = props.startDate.substring(5,7);
          const s_day = props.startDate.substring(8,10);

          const e_year = props.endDate.substring(0,4);
          const e_month = props.endDate.substring(5,7);
          const e_day = props.endDate.substring(8,10);
          
          if (s_year <= year && year <= e_year && s_month <= month && month <= e_month && s_day <= day && day <= e_day){
            acc.push(cur);
            return acc;
          };
          return acc;
        }, []);
        
        for (let i=0; i<res.length; i++) {
          await getAddr(res[i].latitude, res[i].longitude);
        };
      };
    });
    fetchEvents();
  }, [props]);

  useEffect(() => {
    if (!(result === '')){
      for(let i=0; i<data.length; i++){
        if (data[i].country === result) {
          const arr = data;
          arr[i].count += 1;
          arr.sort((a,b) => {
            return b.count - a.count;
          });
          setData(arr);
          return
        }
      }
      setData([...data, {country: result, count: 1}]);
      setFlag(true);
    }
  }, [result]);

  const getAddr = async (lat, lon) => {
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(lat, lon);

    const callback = (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setResult(result[0].address.address_name.substring(0, 2));
        setResult('');
      };
    };

    return await geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }

  const numberWithComma = (x) => {
    return ("" + x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="border">
      <table className="table">
        {flag &&
          data.map(({ country, count }) => (
            <tr>
              <td className='td'>{country}</td>
              <td>{numberWithComma(count)}</td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default Table;
