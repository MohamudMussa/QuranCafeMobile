import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import colors from '../../../utils/colors';
import icons from '../../../utils/icons';
import FontIcon from '../../general/FontIcon/FontIcon';

const StackSearchHeader = ({value, onChange, placeholder}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.touchButtonStyle}>
        <FontIcon icon={icons.ChevronLeftIcon} color={colors.White} size={18} />
      </TouchableOpacity>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        style={styles.searchInputStyle}
      />
    </View>
  );
};

export default StackSearchHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 30,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  searchInputStyle: {
    borderRadius: 20,
    width: '80%',
    height: 35,
    backgroundColor: colors.White,
    marginStart: 10,
    paddingStart: 20,
  },
  touchButtonStyle: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
