import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Modal, StatusBar, ImagePickerIOS } from 'react-native';
import MapView, { Polyline, PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import * as ImagePicker from 'react-native-image-picker';

import { COLOR } from "../config/styles";
import { start, stop } from '../assets/Controller/Geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  instrumentPanel: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    // backgroundColor: 'rgba(0,0,0,0.4)'
    // backgroundColor: 'transparent'
    backgroundColor: 'rgba(255,255,255,0.8)'
  },
  startButton: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  startButtonText: {
    backgroundColor: COLOR.MAIN,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 30,
    color: COLOR.WHITE,
    fontSize: 16
  },
  settingPanel: {
    position: 'absolute',
    right: 10,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    top: 200,
    backgroundColor: 'rgba(255,255,255,0.8)'
  },
  halfContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  temp: {
    fontSize: 42,
    color: "white"
  },
  textContainer: {
    alignItems: "flex-start",
    paddingHorizontal: 40,
    justifyContent: "center",
    flex: 1
  },
  title: {
    color: "white",
    fontSize: 44,
    fontWeight: "300",
    marginBottom: 10,
    textAlign: "left"
  },
  subtitle: {
    fontWeight: "600",
    color: "white",
    fontSize: 24,
    textAlign: "left"
  },
  noticePanel: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: 10,
    left: 10
  },
  circle: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 30,

  },
  noticeText: {
    padding: 10,
    marginLeft: 10,
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#e1e1e1',
    borderBottomWidth: 2,
    borderRightWidth: 3,
    borderTopWidth: 0.4,
    borderLeftWidth: 0.4,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    transform: [{ translateX: 90 }],
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    backgroundColor: COLOR.MAIN
  }
});

const weatherOptions = {
  Thunderstorm: {
    iconName: "thunderstorm-outline",
    gradient: ["#373B44", "#4286f4"],
    title: "번개",
    subtitle: "야외활동을 자제해주세요!"
  },
  Drizzle: {
    iconName: "rainy-outline",
    gradient: ["#89F7FE", "#66A6FF"],
    title: "이슬비",
    subtitle: "비가 추적추적 내리고 있어요."
  },
  Rain: {
    iconName: "rainy-outline",
    gradient: ["#00C6FB", "#005BEA"],
    title: "비",
    subtitle: "비 소식이 있네요."
  },
  Snow: {
    iconName: "snow-outline",
    gradient: ["#7DE2FC", "#B9B6E5"],
    title: "눈",
    subtitle: "눈이 오네요. 하얗게 되어버린 풍경을 즐겨봐요."
  },
  Atmosphere: {
    iconName: "rainy-outline",
    gradient: ["#89F7FE", "#66A6FF"],
    title: "빗발",
    subtitle: "비가 조금씩 내리고 있어요."
  },
  Clear: {
    iconName: "sunny-outline",
    gradient: ["#FF7300", "#FEF253"],
    title: "해",
    subtitle: "화창해요!"
  },
  Clouds: {
    iconName: "cloud-outline",
    gradient: ["#D7D2CC", "#304352"],
    title: "구름",
    subtitle: "구름이 조금 있네요."
  },
  Mist: {
    iconName: "help-outline",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "안개",
    subtitle: "운전에 조심해야돼요."
  },
  Dust: {
    iconName: "leaf-outline",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "먼지",
    subtitle: "마스크를 착용 후 외출하세요."
  },
  Haze: {
    iconName: "help-outline",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "안개",
    subtitle: "운전에 조심해야돼요."
  }
};

let images = [];
let trashCans = [];

const NoticePanel = () => {
  return (
    <View style={styles.noticePanel}>
      <View style={styles.circle}>
        <Icon name="mic-outline" size={30} color={COLOR.MAIN}></Icon>
      </View>
      <View>
        <Text style={styles.noticeText}>공지사항 입니다.</Text>
      </View>

    </View>
  );
}



const SettingPanel = ({ location, mapRegion, isPlaying }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [weather, setWeather] = useState({ condition: 'Clouds', temp: '' });

  const createTrashCans = () => {
    trashCans.push({ latitude: mapRegion.latitude, longitude: mapRegion.longitude });
    console.log(trashCans);
  }

  return (
    <View style={styles.settingPanel}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <LinearGradient
          colors={weatherOptions[weather.condition].gradient}
          style={styles.container}>
          <StatusBar barStyle="light-content" />
          <View style={styles.halfContainer}>
            <Icon
              size={96}
              name={weatherOptions[weather.condition].iconName}
              color="white"
            />
            <Text style={styles.temp}>{weather.temp}°C</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{weatherOptions[weather.condition].title}</Text>
            <Text style={styles.subtitle}>
              {weatherOptions[weather.condition].subtitle}
            </Text>
          </View>
        </LinearGradient>
      </Modal>
      <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => {
        createTrashCans();
      }}>
        <Icon name="trash-outline" color={COLOR.MAIN} size={30}></Icon>
      </TouchableOpacity>
      <TouchableOpacity onPress={async () => {
        let {
          data: {
            main: { temp },
            weather
          }
        } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude == 0 ? 37 : location.latitude}&lon=${location.latitude == 0 ? 127.5 : location.latitude}&appid=78cb44672b70346d875e57f7a3e79388`);
        temp = Math.round((temp - 273.15) * 10) / 10;
        console.log(['[날씨와 온도] : ', weather[0].main, temp])
        setWeather({ condition: weather[0].main, temp });
        setModalVisible(!modalVisible);
      }}>
        <Icon name="sunny-outline" color={COLOR.MAIN} size={30}></Icon>
      </TouchableOpacity>
    </View>
  );
}

const InstrumentPanel = ({ elapsedTime, speed, distance }) => {
  return (
    <View style={styles.instrumentPanel}>
      <View style={{ marginBottom: 10 }}>
        <Text >소요시간</Text>
        <Text>
          {parseInt(elapsedTime / 3600) < 10
            ? '0' + parseInt(elapsedTime / 3600)
            : parseInt(elapsedTime / 3600)}
          :
          {parseInt((elapsedTime % 3600) / 60) < 10
            ? '0' + parseInt((elapsedTime % 3600) / 60)
            : parseInt((elapsedTime % 3600) / 60)}
          :
          {(elapsedTime % 60) < 10
            ? '0' + parseInt(elapsedTime % 60)
            : parseInt(elapsedTime % 60)}
        </Text>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text>거리</Text>
        <Text>{distance.toFixed(2)}km</Text>
      </View>
      <View>
        <Text>속도</Text>
        <Text>{Math.round(speed * 10) / 10}km/h</Text>
      </View>
    </View>
  )
}
const sendToServer = async (obj, latitude, longitude) => {
  images.push({
    src: obj.base64,
    latitude: latitude,
    longitude: longitude
  });
  console.log(images.length);
}
const CameraButton = ({ latitude, longitude }) => {
  return (
    <View style={styles.cameraButton}>
      <TouchableOpacity onPress={() => {
        const launchCamera = () => {
          let options = {
            mediaType: 'photo',
            maxWidth: 512,
            maxHeight: 512,
            storageOptions: {
              skipBackup: true,
            },
            includeBase64: true
          };
          ImagePicker.launchCamera(options, callback => {
            if (callback.didCancel) {
              Alert.alert('사진을 선택하지 않음');
            } else if (callback.error) {
              console.log('ImagePicker Error: ', callback.error);
              Alert.alert('', callback.error);
            } else {
              sendToServer(callback.assets[0], latitude, longitude);
            }
          });
        }
        launchCamera();
      }}>
        <Icon name="camera-outline" size={18} color={COLOR.WHITE} />
      </TouchableOpacity>
    </View>
  );
}

const HomeScreen = () => {
  const [location, setLocation] = useState({
    longitude: 0,
    latitude: 0,
    altitude: 0,
    speed: 0,
    motion: '',
    state: '',
    distance: 0,
  });
  const [elapsedTime, setElapsedTime] = useState(0); // 소요시간
  const [isPlaying, setIsPlaying] = useState(false); // 출발, 중지
  const [startTime, setStartTime] = useState(0); // 소요시간을 구하기 위한 처음 시작 시간 
  const [path, setPath] = useState([]);
  const [mapRegion, setMapRegion] = useState({ latitude: 0.0, longitude: 0.0 });

  const polylineRef = useRef();

  let distanceTmp = 0;
  var pathTmp = [];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        let nowTime = new Date();
        let difTime = nowTime.getTime() - startTime.getTime();
        console.log('[소요 시간]: ', difTime / 1000);
        setElapsedTime(difTime / 1000);
      }, 1000);
      return () => {
        clearInterval(interval);
      }
    }
  }, [isPlaying, elapsedTime]);

  const geolocationCallback = (obj) => {
    distanceTmp = distanceTmp + obj.distance;
    setLocation({ ...obj, distance: distanceTmp });
    pathTmp.push({ latitude: obj.latitude, longitude: obj.longitude });
    setPath(pathTmp)
    polylineRef.current.setNativeProps({ coordinates: [...pathTmp] });
  }

  const StartButton = () => {
    return (
      <View>
        <TouchableOpacity style={styles.startButton} onPress={() => {
          console.log('pressed!');
          start(geolocationCallback);
          setIsPlaying(!isPlaying);
          setStartTime(new Date());
        }}>
          <Text style={styles.startButtonText}>start</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const StopButton = () => {
    return (
      <View>
        <TouchableOpacity style={styles.startButton} onPress={() => {
          console.log('pressed!');
          const storeInfo = async () => {
            try {
              const info = {
                distance: location.distance.toFixed(2),
                elapsedTime: elapsedTime.toFixed(0),
                path: path,
                images: images
              };

              let today = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
              let year = today.getFullYear();
              let month = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1);
              let date = today.getDate() > 9 ? today.getDate() : '0' + today.getDate();
              let hours = today.getHours() > 9 ? today.getHours() : '0' + today.getHours();
              let minutes = today.getMinutes() > 9 ? today.getMinutes() : '0' + today.getMinutes();
              let seconds = today.getSeconds() > 9 ? today.getSeconds() : '0' + today.getSeconds();

              let keyString = 'record' + year + month + date + hours + minutes + seconds;
              console.log(info);
              await AsyncStorage.setItem(keyString, JSON.stringify(info));
              Alert.alert('성공', '플로깅 기록이 저장되었습니다. 기록 탭에서 확인해보세요!');

            } catch (error) {
              console.log(error);
              Alert.alert('실패', '오류로 인하여 저장에 실패하였습니다. 관리자에게 문의해주세요!');
            }
          }
          storeInfo();
          polylineRef.current.setNativeProps({ coordinates: [] });
          stop();
          setIsPlaying(!isPlaying);
          setElapsedTime(0);
          distanceTmp = 0;
          images = [];
          setLocation({ ...location, distance: 0, speed: 0 });
        }}>
          <Text style={styles.startButtonText}>stop</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.533809,
          longitude: 126.994563,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}

        onRegionChangeComplete={(region) => {
          setMapRegion(region);
        }}
      >
        {
          trashCans.map((item, key) => {
            return (
              <Marker draggable={true}
                coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                image={require('../assets/img/delete.png')}
                onDragEnd={(e) => {
                  trashCans[key].latitude = e.nativeEvent.coordinate.latitude;
                  trashCans[key].longitude = e.nativeEvent.coordinate.longitude;
                }}
                onPress={() => {
                  Alert.alert('', '삭제하시겠습니까?',
                    [
                      {
                        text: '예',
                        onPress: () => {
                          trashCans.splice(key, 1);
                        }
                      },
                      {
                        text: '아니오',
                      }
                    ]);
                }}
              />
            )
          })
        }
        <Polyline
          ref={polylineRef}
          coordinates={[]}
          strokeColor={COLOR.MAIN}
          strokeWidth={7}
        />
      </MapView>
      <InstrumentPanel elapsedTime={elapsedTime} speed={location.speed} distance={location.distance} />
      {isPlaying ? <><StopButton /><CameraButton latitude={location.latitude} longitude={location.longitude} /></> : <StartButton />}
      <SettingPanel location={location} mapRegion={mapRegion} isPlaying={isPlaying} />
      <NoticePanel />
    </View>

  )
}

export default HomeScreen;