import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Check from '../../assets/images/check.png';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';

const PickerInput = ({placeholder, text, onPress, disabled}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.textStyle}>{!text ? placeholder : text}</Text>
      {!!text && <Image source={Check} style={styles.checkIcon} />}
    </TouchableOpacity>
  );
};

PickerInput.defaultProps = {
  placeholder: 'Please select',
};

export default PickerInput;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 54,
    backgroundColor: colors.Nutral5,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  checkIcon: {
    width: 22,
    height: 22,
  },
  textStyle: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: fonts.PoppinsMedium,
    color: colors.Nurtral40,
  },
});
