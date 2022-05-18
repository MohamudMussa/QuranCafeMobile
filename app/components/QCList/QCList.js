import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';
import StackSearchHeader from '../headers/StackSearchHeader/StackSearchHeader';

const QCList = ({route}) => {
  const [searchText, setSearchText] = useState('');
  const [listData, setListData] = useState();
  const navigation = useNavigation();
  const {list, onSelect} = route.params;

  useEffect(() => {
    setListData(list);
  }, [list]);

  const handleItemSelection = item => {
    onSelect(item);
    navigation.goBack();
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.listItemWrapper}
        onPress={() => handleItemSelection(item)}>
        <Text style={styles.listItemText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const handleSearch = text => {
    const filteredList = list.filter(c => c.includes(text));
    setSearchText(text);
    setListData(filteredList);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StackSearchHeader
        placeholder="Search Here..."
        onChange={handleSearch}
        value={searchText}
      />
      <View style={styles.listWrapper}>
        <FlatList
          data={listData}
          renderItem={renderItem}
          removeClippedSubviews={true}
          windowSize={50}
          keyExtractor={item => item}
        />
      </View>
    </SafeAreaView>
  );
};

export default QCList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Black,
  },
  listWrapper: {
    marginStart: 10,
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  listItemWrapper: {
    height: 50,
    marginTop: 1.5,
    marginBottom: 1.5,
    justifyContent: 'center',
    marginStart: 20,
  },
  listItemText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: fonts.PoppinsRegular,
    color: colors.White,
  },
});
