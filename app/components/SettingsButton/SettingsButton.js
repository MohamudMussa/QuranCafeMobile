import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';

const SettingsButton = ({text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
      <Text style={styles.buttonTextStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SettingsButton;

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    height: 55,
    justifyContent: 'center',
    marginTop: 1,
    backgroundColor: colors.Black,
    borderTopColor: colors.SettingButtonBorder,
    borderBottomColor: colors.SettingButtonBorder,
    borderWidth: 1,
  },
  buttonTextStyle: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: fonts.PoppinsRegular,
    color: colors.White,
    marginStart: 30,
  },
});
