import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AlphabetList from 'react-native-flatlist-alphabet';
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

  const formatedData = () => {
    return list.map(l => ({
      value: l,
      key: l,
    }));
  };

  const renderItem = item => {
    return (
      <TouchableOpacity
        style={styles.listItemWrapper}
        onPress={() => handleItemSelection(item.value)}>
        <Text style={styles.listItemText}>{item.value}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StackHeader title={title} />
      <View style={styles.listWrapper}>
        <AlphabetList
          data={formatedData()}
          renderItem={renderItem}
          removeClippedSubviews={true}
          windowSize={50}
          indexLetterColor={colors.Ecstasy}
          keyExtractor={item => item}
        />
      </View>
    </SafeAreaView>
  );
};

export default QCList;

const styles = StyleSheet.create({
  container: {
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
