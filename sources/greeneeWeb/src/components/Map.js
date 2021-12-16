import React, { useEffect } from "react";
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

const Map = () => {
  // const [data, setData] = useState([]);
  useEffect(() => {
    
    const fetchEvents = async () => {
      const res = await axios.get("http://39.117.55.147/user/getAllData");
      makeData(res.data);
    };

    const makeData = (items) => {
      const arr = items.reduce((acc, cur) => {
        const latitude = cur.latitude;
        const longitude = cur.longitude;
        const date = new Date(cur.timeStamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDay();
        const hour = date.getHours();
        const min = date.getMinutes();
        const second = date.getSeconds();
        console.log(cur.path.split(''));
        console.log(cur.path.split('\\')[1], cur.path.split('\\')[2]);
        
        const time = 
          year + "년 " + month + "월 " + day + "일 " + hour + "시 " + min + "분 " + second + "초";
        const img = 'http://39.117.55.147/static/' + cur.path.split('\\')[2]
        console.log(img);
        const username = cur.id;
        acc.push([
          latitude,
          longitude,
          '<div class="wrap">' +
          '    <div class="info">' +
          '        <div class="title">' + 
                    username +
          "        </div>" +
          '        <div class="body">' +
          '            <div class="img">' +
          "                <img src=" + img + ' width="73" height="70">' +
          "           </div>" +
          '            <div class="desc">' +
          '                <div class="ellipsis">' +
                            '위치 : (' + latitude + ', ' + longitude + ')' +
          "                </div> " +
          '                <div class="jibun ellipsis">' +
                            time +
          "                </div> " +
          "            </div>" +
          "        </div>" +
          "    </div>" +
          "</div>",
        ]);
        return acc;
      }, []);
      
      first(arr);
    };

    const container = document.getElementById("Map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const clusterer = new kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 5,
    });

    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    const imageSize = new kakao.maps.Size(24, 35);
    const imageOption = { offset: new kakao.maps.Point(27, 69) };

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const locPosition = new kakao.maps.LatLng(lat, lon);
        const message =
          '<div style="padding:0.5rem;font-size:1rem;width:max-content;">현재위치</div>';

        displayMarker(locPosition, message);
      });
    }

    const displayMarker = (locPosition, message) => {
      let marker_present = new kakao.maps.Marker({
        map: map,
        position: locPosition,
        image: markerImage,
      });

      const iwContent = message;
      const iwRemoveable = true;

      const infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      infowindow.open(map, marker_present);

      map.setCenter(locPosition);
    };

    const makeOverListener = (map, overlay) => {
      return () => {
        overlay.setMap(map);
      };
    };

    const markers = [];

    const first = (data) => {
      for (let i = 0; i < data.length; i++) {
        const markerPosition = new kakao.maps.LatLng(data[i][0], data[i][1]);
        
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
  
        marker.setMap(map);
        const iwContent = data[i][2];
        const iwPosition = markerPosition;
  
        const overlay = new kakao.maps.CustomOverlay({
          content: iwContent,
          map: map,
          position: iwPosition,
        });
  
        markers.push(marker);
  
        kakao.maps.event.addListener(marker, "click",
          makeOverListener(map, overlay)
        );
  
        kakao.maps.event.addListener(map, "click", () => {
          overlay.setMap(null);
        });
      }
    }
    
    fetchEvents();
    clusterer.addMarkers(markers);
  }, []);

  return (
    <div id="Map" style={{
        width: "75vw",
        height: "100vh",
      }}
    ></div>
  );
};

export default Map;
