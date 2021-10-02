import React, { useRef, useState, useContext } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLOR } from "../config/styles";
import loginContext from '../context/Context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  inputText: {
    borderColor: COLOR.MAIN,
    borderWidth: 1,
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    width: 300
  },
  button: {
    width: 300,
    backgroundColor: COLOR.MAIN,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15
  },
  buttonText: {
    color: COLOR.WHITE,
  }
});

const SignInScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    id: '',
    pwd: '',
  });
  const ref_pwd = useRef();
  const { loginToken, setLoginToken } = useContext(loginContext);

  // 로그인버튼 눌렀을 때
  const signIn = async () => {
    // try {
    //   // let response = await axios.post('',userInfo);
    //   let storedUserInfo = await AsyncStorage.getItem('userInfo');
    //   if(storedUserInfoJSON === null ) return;
    //   let storedUserInfoJSON = JSON.parse(storedUserInfo);
    //   if (userInfo.id === storedUserInfoJSON.id && userInfo.pwd === storedUserInfoJSON.pwd) {
    //     const loginHandler = setLoginToken(true);
    //   } else {
    //     Alert.alert('에러', '아이디 혹은 비밀번호가 일치하지 않습니다.')
    //   }
    // } catch (error) {
    //   console.log('[signInError] : ', error);
    // }
    const loginHandler = setLoginToken(true);
  }

  const signUp = () => {
    navigation.navigate('SignUp');
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Image
            source={require('../assets/img/GREENEEText.png')}
            style={styles.logoImage} />
        </View>
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <TextInput
            style={styles.inputText}
            placeholder="아이디"
            returnKeyType="next"
            onSubmitEditing={() => ref_pwd.current.focus()}
            onChangeText={id => {
              setUserInfo({ ...userInfo, id: id });
              console.log('[아이디] : ', id);
            }}
          />
          <TextInput
            style={styles.inputText}
            secureTextEntry={true}
            ref={ref_pwd}
            placeholder="비밀번호"
            onChangeText={pwd => {
              setUserInfo({ ...userInfo, pwd: pwd });
              console.log('[비밀번호] : ', pwd);
            }} />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.button} onPress={() => {
            console.log('[userInfo] : ', userInfo);
            signIn();
          }}>
            <Text style={styles.buttonText}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            signUp();
          }}>
            <Text style={styles.buttonText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );

}

export default SignInScreen;