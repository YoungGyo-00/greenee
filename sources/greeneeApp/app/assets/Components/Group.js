import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLOR } from "../../config/styles";

const styles = StyleSheet.create({
  container: {
    height: 80,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginBottom: 1,
    justifyContent: "space-around"
  },
  contentsWrapper: {
    marginLeft: 20,
    flex: 1,
    justifyContent: "space-around"
  },
  imageWrapper:{
    justifyContent:'center'
  },
  title:{
    fontSize: 14
  },
  count:{
    color: COLOR.MAIN,
    fontSize: 14
  },
  group:{
    fontSize: 11
  },
  explanation:{
    fontSize: 14,
    color: '#3b3b3b'
  },

});

const Group = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Icon name="image-outline" size={50} />
      </View>
      <View style={styles.contentsWrapper}>
        <Text style={styles.title}>{data.title}</Text>
        <Text><Text style={styles.count}>{data.count}  </Text><Text style={styles.group}>{data.group}</Text></Text>
        <Text style={styles.explanation}>{data.explanation}</Text>
      </View>
    </View>
  );
}

export default Group;