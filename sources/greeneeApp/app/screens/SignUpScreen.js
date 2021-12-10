import React, { useRef } from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { COLOR } from "../config/styles";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center'
  },
  input: {
    borderColor: COLOR.MAIN,
    borderWidth: 1,
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
  },
  errorMessage: {
    color: "red"
  },
  mb_3: {
    marginBottom: 10
  },
  button: {
    backgroundColor: COLOR.MAIN,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15
  }
})

const SignUpScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const ref_cellphone = useRef();
  const ref_id = useRef();
  const ref_pwd = useRef();

  const validate = (user) => {
    var id = user.id;
    var pwd = user.pwd;
    var cellphone = user.cellphone;
    var nickName = user.nickName;

    if (id.length > 30) {
      Alert.alert('입력오류', '아이디는 30자리 이하로 입력해주세요');
      return true;
    }
    if (pwd.length > 100) {
      Alert.alert('입력오류', '비밀번호는 100자리 이하로 입력해주세요');
      return true;
    }
    if (cellphone.length > 11) {
      Alert.alert('입력오류', '전화번호는 11자리 이하로 입력해주세요');
      return true;
    }
    if (nickName.length > 10) {
      Alert.alert('입력오류', '닉네임은 10자리 이하로 입력해주세요');
      return true;
    }

  }

  const onSubmit = async (data) => {
    console.log(data);
    if (validate(data)) return;
    try {
      await axios.post(
        'http://39.117.55.147/user/signUp',
        JSON.stringify(data),
        {
          timeout: 3000,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then((res) => {
        console.log(res);
        navigation.navigate('SignIn');
      });
    } catch (error) {
      console.log('[signUpError] : ', error.message);
      if (Object.keys(error.response.data).length != 0) {
        console.log(error.response.data.errorMessage);
        Alert.alert('에러', error.response.data.errorMessage);
      } else {
        Alert.alert('서버에러', '회원가입에 실패하였습니다. 다시 시도해주세요.');
      }
    }

  }
  const cellphoneRegExp = /^[0-9]+$/;
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.mb_3}>닉네임</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="홍길동"
              returnKeyType="next"
              onSubmitEditing={() => ref_cellphone.current.focus()}
              onChangeText={value => onChange(value)}
              value={value}
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

        <Text style={styles.mb_3}>전화번호</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="-를 제외하고 입력하세요!"
              ref={ref_cellphone}
              returnKeyType="next"
              onSubmitEditing={() => ref_id.current.focus()}
              onChangeText={value => onChange(value)}
              value={value}
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

        <Text style={styles.mb_3}>아이디</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="아이디"
              ref={ref_id}
              returnKeyType="next"
              onSubmitEditing={() => ref_pwd.current.focus()}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="id"
          rules={{
            required: {
              value: true, message: '필수 입력 항목입니다'
            },
          }}
        />
        <Text style={[styles.errorMessage, styles.mb_3]}>{errors?.id?.message}</Text>

        <Text style={styles.mb_3}>비밀번호</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="비밀번호"
              ref={ref_pwd}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="pwd"
          rules={{
            required: {
              value: true, message: '필수 입력 항목입니다'
            },
          }}
        />
        <Text style={[styles.errorMessage, styles.mb_3]}>{errors?.pwd?.message}</Text>


        <Button title="회원가입" onPress={handleSubmit(onSubmit)} color={COLOR.MAIN} />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default SignUpScreen;