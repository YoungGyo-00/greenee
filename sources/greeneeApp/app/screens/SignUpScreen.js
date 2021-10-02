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

  const onSubmit = (data) => {
    console.log(data);
    // 여기서 서버로 전송
    try {
      AsyncStorage.setItem('userInfo', JSON.stringify(data)).then(() => {
        console.log(data);
        navigation.navigate('SignIn');
      });
    } catch (error) {
      Alert.alert('에러', '회원가입에 실패하였습니다. 다시 시도해주세요.');
    }

  }
  const cellphoneRegExp = /^[0-9]+$/;
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.mb_3}>이름</Text>
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
          name="name"
          rules={{
            required: {
              value: true, message: '필수 입력 항목입니다'
            },
          }}
        />
        <Text style={[styles.errorMessage, styles.mb_3]}>{errors?.name?.message}</Text>

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