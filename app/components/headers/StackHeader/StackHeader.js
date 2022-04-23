import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import fonts from '../../../utils/fonts';
import icons from '../../../utils/icons';

const StackHeader = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={icons.ChevronLeftIcon}
          style={styles.iconStyle}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles.titleStyle}>{title}</Text>
    </View>
  );
};

export default StackHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    justifyContent: 'space-between',
    paddingStart: 30,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: fonts.PoppinsMedium,
    alignItems: 'center',
  },
});
