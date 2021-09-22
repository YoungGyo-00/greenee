import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    borderRadius: 4,
    padding: (10, 14, 10, 12),
    margin: (0, 20),
    display: 'flex'
  },
  searchInput: {
    flex:1,
    marginLeft: 10,
    includeFontPadding: false,
    padding: 0,
  },
  searchIcon: {
    width: 18,
    height: 18,
  }
});
const SearchBar = ({value, setValue}) => {
  return (
    <View style={styles.searchBarWrapper}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.searchInput}
        returnKeyType="search"
        returnKeyLabel="search"
        value={value}
        placeholder="검색어를 입력해주세요."
        onChangeText={(e) => {
          setValue(e);
        }}
      />
      <Icon name="search-outline" size={18} />
    </View>
  )
}

export default SearchBar;