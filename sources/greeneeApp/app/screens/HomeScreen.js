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
    title: "??????",
    subtitle: "??????????????? ??????????????????!"
  },
  Drizzle: {
    iconName: "rainy-outline",
    gradient: ["#89F7FE", "#66A6FF"],
    title: "?????????",
    subtitle: "?????? ???????????? ????????? ?????????."
  },
  Rain: {
    iconName: "rainy-outline",
    gradient: ["#00C6FB", "#005BEA"],
    title: "???",
    subtitle: "??? ????????? ?????????."
  },
  Snow: {
    iconName: "snow-outline",
    gradient: ["#7DE2FC", "#B9B6E5"],
    title: "???",
    subtitle: "?????? ?????????. ????????? ???????????? ????????? ????????????."
  },
  Atmosphere: {
    iconName: "rainy-outline",
    gradient: ["#89F7FE", "#66A6FF"],
    title: "??????",
    subtitle: "?????? ????????? ????????? ?????????."
  },
  Clear: {
    iconName: "sunny-outline",
    gradient: ["#FF7300", "#FEF253"],
    title: "???",
    subtitle: "????????????!"
  },
  Clouds: {
    iconName: "cloud-outline",
    gradient: ["#D7D2CC", "#304352"],
    title: "??????",
    subtitle: "????????? ?????? ?????????."
  },
  Mist: {
    iconName: "help-outline",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "??????",
    subtitle: "????????? ??????????????????."
  },
  Dust: {
    iconName: "leaf-outline",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "??????",
    subtitle: "???????????? ?????? ??? ???????????????."
  },
  Haze: {
    iconName: "help-outline",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "??????",
    subtitle: "????????? ??????????????????."
  }
};

let images = [];
let userInfo = {};
// let trashCans = [];

const NoticePanel = () => {
  return (
    <View style={styles.noticePanel}>
      <View style={styles.circle}>
        <Icon name="mic-outline" size={30} color={COLOR.MAIN}></Icon>
      </View>
      <View>
        <Text style={styles.noticeText}>???????????? ?????????.</Text>
      </View>

    </View>
  );
}

const SettingPanel = ({ location, mapRegion, isPlaying, trashCans, setTrashCans }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [weather, setWeather] = useState({ condition: 'Clouds', temp: '' });

  const createTrashCans = () => {
    if (isPlaying) {
      console.log(trashCans);
      let tmp = trashCans;
      tmp.push({ latitude: mapRegion.latitude, longitude: mapRegion.longitude });
      setTrashCans(tmp);
    } else {
      Alert.alert('??????', '?????? ?????? ??????????????? ????????? ??????????????? ??????, ????????? ??? ????????????!');
    }
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
            <Text style={styles.temp}>{weather.temp}??C</Text>
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
        console.log(['[????????? ??????] : ', weather[0].main, temp])
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
        <Text >????????????</Text>
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
        <Text>??????</Text>
        <Text>{distance.toFixed(2)}km</Text>
      </View>
      <View>
        <Text>??????</Text>
        <Text>{Math.round(speed * 10) / 10}km/h</Text>
      </View>
    </View>
  )
}

const sendToServer = async (obj, latitude, longitude) => {
  images.push({
    files: obj.uri,
    src: obj.base64,
    latitude: latitude,
    longitude: longitude,
    name: obj.fileName,
    type: obj.type,
    timeStamp: new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 9 * 60 * 60 * 1000).toString()
  });
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
              Alert.alert('????????? ???????????? ??????');
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
  const [elapsedTime, setElapsedTime] = useState(0); // ????????????
  const [isPlaying, setIsPlaying] = useState(false); // ??????, ??????
  const [startTime, setStartTime] = useState(0); // ??????????????? ????????? ?????? ?????? ?????? ?????? 
  const [path, setPath] = useState([]);
  const [mapRegion, setMapRegion] = useState({ latitude: 0.0, longitude: 0.0 });
  const [trashCans, setTrashCans] = useState([]);
  const polylineRef = useRef();

  let distanceTmp = 0;
  var pathTmp = [];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        let nowTime = new Date();
        let difTime = nowTime.getTime() - startTime.getTime();
        console.log('[?????? ??????]: ', difTime / 1000);
        setElapsedTime(difTime / 1000);
      }, 1000);
      return () => {
        clearInterval(interval);
      }
    }
  }, [isPlaying, elapsedTime]);

  useEffect(() => {
    let today = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 9 * 60 * 60 * 1000);
    const getTrashCan = async () => {
      let tmp = ""
      try {
        tmp = await AsyncStorage.getItem('trashCans');
      } catch (error) {
        console.log('[getTrashCan] : ', error);
        Alert.alert('??????', '???????????? ????????? ??????????????? ?????????????????????. ?????? ?????????????????????!');
      }
      if (tmp != null) {
        setTrashCans(JSON.parse(tmp));
      }
    }
    getTrashCan();
  }, []); 

  useEffect(()=>{
    const getUserInfo = async() => {
      let userInfoString = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfoString);
      console.log(userInfo);
    };
    getUserInfo();
  }, [])
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
              let today = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 9 * 60 * 60 * 1000);
              let year = today.getFullYear();
              let month = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1);
              let date = today.getDate() > 9 ? today.getDate() : '0' + today.getDate();
              let hours = today.getHours() > 9 ? today.getHours() : '0' + today.getHours();
              let minutes = today.getMinutes() > 9 ? today.getMinutes() : '0' + today.getMinutes();
              let seconds = today.getSeconds() > 9 ? today.getSeconds() : '0' + today.getSeconds();

              let keyString = 'record' + year + month + date + hours + minutes + seconds;
              
              // images??? ???????????? ?????? ????????? ?????? ???????????? ????????? ?????? ????????????. 
              // files: ?????? ?????????
              // src: ????????? base64 ?????????
              // latitude: latitude
              // longitude: longitude
              // name: ?????????
              // type: ?????? ??????
              // timeStamp: ??????

              if (images.length !== 0) {
                console.log("images ????????? ????????? ???????????????!");
                const formData = new FormData();

                for (let i = 0; i < images.length; i++) {
                  console.log(userInfo.id);
                  formData.append("image", {
                    name: images[i].name,
                    type: images[i].type,
                    uri : images[i].files
                  });
                  formData.append("latitude",images[i].latitude);
                  formData.append("longitude",images[i].longitude);
                  formData.append("timeStamp", images[i].timeStamp);
                  formData.append("id", userInfo.id);
                }
                console.log("formData : ", formData);
                await axios.post(
                  'http://39.117.55.147/user/upload',
                  formData,
                  {
                    timeout: 5000,
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  }
                ).then((res) => {
                  console.log(res);
                });

              }
              await AsyncStorage.setItem(keyString, JSON.stringify(info));
              await AsyncStorage.setItem('trashCans', JSON.stringify(trashCans));
              Alert.alert('??????', '????????? ????????? ?????????????????????. ?????? ????????? ??????????????????!');

            } catch (error) {
              console.log(error);
              Alert.alert('??????', '????????? ????????? ????????? ?????????????????????. ??????????????? ??????????????????!');
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
              <Marker draggable={isPlaying} key={key}
                coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                image={require('../assets/img/delete.png')}
                onDragEnd={(e) => {
                  let tmp = trashCans;
                  tmp[key].latitude = e.nativeEvent.coordinate.latitude;
                  tmp[key].longitude = e.nativeEvent.coordinate.longitude;
                  setTrashCans(tmp);
                }}
                onPress={() => {
                  if (isPlaying) {
                    Alert.alert('', '?????????????????????????',
                      [
                        {
                          text: '???',
                          onPress: () => {
                            let tmp = trashCans;
                            tmp.splice(key, 1);
                            setTrashCans(tmp);
                          }
                        },
                        {
                          text: '?????????',
                        }
                      ]);
                  }
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
      <SettingPanel location={location} mapRegion={mapRegion} isPlaying={isPlaying} trashCans={trashCans} setTrashCans={setTrashCans} />
      <NoticePanel />
    </View>

  )
}

export default HomeScreen;