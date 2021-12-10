import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Alert, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from "axios";

import { COLOR } from "../config/styles";
import loginContext from '../context/Context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  content: {
    flex: 1,
  },

  elem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#ccc',
    borderBottomWidth: 0.5,
    padding: 5,
    borderBottomWidth: 1,
    height: 60
  },
  title: {
    paddingLeft: 10,
  },
  errorMessage: {
    color: "red"
  },
  mb_3: {
    marginBottom: 10
  },
});

const ProfileScreen = () => {
  const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const [userInfo, setUserInfo] = useState({
    nickName: '',
    cellphone: '',
    age: '',
    gender: ''
  });
  const { loginToken, setLoginToken } = useContext(loginContext);
  const [selectedValue, setSelectedValue] = useState("남");

  const cellphoneRegExp = /^[0-9]+$/;

  const onSubmit = async (data) => {
    data['gender'] = selectedValue || "남";
    try {
      let storedUserInfo = await AsyncStorage.getItem('userInfo');
      let storedUserInfoJSON = JSON.parse(storedUserInfo);
      storedUserInfoJSON['gender'] = data['gender'];
      storedUserInfoJSON['age'] = data['age'];
      console.log(storedUserInfoJSON);
      await axios.post(
        'http://39.117.55.147/user/update',
        JSON.stringify(storedUserInfoJSON),
        {
          timeout: 3000,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then(async (res) => {
        console.log(res);
        await AsyncStorage.setItem('userInfo', JSON.stringify(storedUserInfoJSON)).then(() => {
          console.log(data);
          Alert.alert('', '저장되었습니다.');
        });
      })


    } catch (error) {
      console.log(error);
      Alert.alert('에러', '저장에 실패하였습니다. 다시 시도해주세요.');
    }
  }
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        let storedUserInfo = await AsyncStorage.getItem('userInfo');
        console.log(storedUserInfo);
        let storedUserInfoJSON = JSON.parse(storedUserInfo);
        setUserInfo(storedUserInfoJSON);
        setValue('nickName', storedUserInfoJSON.nickName);
        setValue('cellphone', storedUserInfoJSON.cellphone);
        setValue('age', storedUserInfoJSON.age);
        setSelectedValue(storedUserInfoJSON.gender);
      } catch (error) {
        Alert.alert('에러', '사용자 정보를 불러오는데 실패하였습니다.');
        console.log(error);
      }
    };
    getUserInfo();
  }, []);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.elem}>
          <View>
            <Text style={{ fontSize: 24, marginBottom: 10 }}>프로필</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Button title="로그아웃" onPress={async() => {
              console.log('로그아웃');
              await AsyncStorage.removeItem("userInfo");
              await AsyncStorage.removeItem("loginToken");
              const loginHandler = setLoginToken(false);
              
            }} color={COLOR.RED} />

            <Button title="저장"
              onPress={handleSubmit(onSubmit)}
              color={COLOR.MAIN}
            />
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.elem}>
            <View style={styles.userInfo}>
              <Text style={styles.title}>이름</Text>
            </View>
            <View style={styles.userComment}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="홍길동"
                    onChangeText={value => onChange(value)}
                    value={value}
                    defaultValue={userInfo.nickName}

                  />
                )}
                name="nickName"
                rules={{
                  required: {
                    value: true, message: '필수 입력 항목입니다'
                  },
                }}
              />
              <Text style={[styles.errorMessage, styles.mb_3]}>{errors?.nickName?.message}</Text>
            </View>
          </View>
          <View style={styles.elem}>
            <View style={styles.userInfo}>
              <Text style={styles.title}>전화번호</Text>
            </View>
            <View style={styles.userComment}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="- 제외"
                    onChangeText={value => onChange(value)}
                    value={value}
                    defaultValue={userInfo.cellphone}
                  />
                )}
                name="cellphone"
                rules={{
                  required: {
                    value: true, message: '필수 입력 항목입니다'
                  },
                  pattern: {
                    value: cellphoneRegExp,
                    message: '숫자만 입력하세요!'
                  }
                }}
              />
              <Text style={[styles.errorMessage, styles.mb_3]}>{errors?.cellphone?.message}</Text>
            </View>
          </View>
          <View style={styles.elem}>
            <View style={styles.userInfo}>
              <Text style={styles.title}>나이</Text>
            </View>
            <View style={styles.userComment}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="22"
                    onChangeText={value => onChange(value)}
                    value={value}
                    defaultValue={userInfo.age}
                  />
                )}
                name="age"
                rules={{
                  pattern: {
                    value: cellphoneRegExp,
                    message: '숫자만 입력하세요!'
                  }
                }}
              />
              <Text style={[styles.errorMessage, styles.mb_3]}>{errors?.cellphone?.message}</Text>
            </View>
          </View>
          <View style={styles.elem}>
            <View style={styles.userInfo}>
              <Text style={styles.title}>성별</Text>
            </View>
            <View style={styles.userComment}>
              <Picker
                style={{ width: 100 }}
                dropdownIconColor={COLOR.MAIN}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedValue(itemValue);
                }}
              >
                <Picker.Item label="남" value="남" />
                <Picker.Item label="여" value="여" />
              </Picker>

            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default ProfileScreen;