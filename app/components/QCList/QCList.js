import {useNavigation} from '@react-navigation/core';
import moment from 'moment';
import React from 'react';
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
import StackHeader from '../headers/StackHeader/StackHeader';

const QCList = ({route}) => {
  const navigation = useNavigation();
  const {title, list, onSelect} = route.params;

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
  return (
    <SafeAreaView>
      <StackHeader title={title} />
      <View style={styles.listWrapper}>
        <FlatList
          data={list}
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
    color: colors.NutralBlack,
  },
});
