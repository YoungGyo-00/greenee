import axios from 'axios';
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Modal, StatusBar } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import { COLOR } from "../config/styles";

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

const SettingPanel = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [weather, setWeather] = useState({ condition: 'Clouds', temp: '' });
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
              color="black"
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
        Alert.alert('아차차!', '준비중인 기능입니다 조금만 기다려주세요 :(');
      }}>
        <Icon name="trash-outline" color={COLOR.MAIN} size={30}></Icon>
      </TouchableOpacity>
      <TouchableOpacity onPress={async () => {
        let {
          data: {
            main: { temp },
            weather
          }
        } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=37&lon=127.5&appid=78cb44672b70346d875e57f7a3e79388`);
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
        <Text>{elapsedTime}</Text>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text>거리</Text>
        <Text>{distance}km</Text>
      </View>
      <View>
        <Text>속도</Text>
        <Text>{speed}km/h</Text>
      </View>
    </View>
  )
}

const StartButton = () => {
  return (
    <View>
      <TouchableOpacity style={styles.startButton} onPress={() => {
        console.log('pressed!');
      }}>
        <Text style={styles.startButtonText}>start</Text>
      </TouchableOpacity>
    </View>
  )
}

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.28825,
          longitude: 127.5324,
          latitudeDelta: 2,
          longitudeDelta: 2,
        }} />
      <InstrumentPanel elapsedTime={0} speed={0} distance={0} />
      <StartButton />
      <SettingPanel />
      <NoticePanel />
    </View>

  )
}

export default HomeScreen;