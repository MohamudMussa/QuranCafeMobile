import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';

const SettingsButton = ({text, icon, iconStyle, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
      <View
        style={{
          // flexDirection: 'row',
          // alignItems: 'center',
          // justifyContent: 'center',
          alignSelf: 'center',
          marginLeft: 70,
        }}>
        <Image source={icon} style={iconStyle} />
      </View>
      <View
        style={{
          // flexDirection: 'row',
          // alignItems: 'center',
          // justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Text style={styles.buttonTextStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SettingsButton;

const styles = StyleSheet.create({
  buttonStyle: {
    width: '90%',
    alignSelf: 'center',
    height: 55,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 1,
    backgroundColor: '#C6AE8A',
    // borderTopColor: colors.SettingButtonBorder,
    // borderBottomColor: colors.SettingButtonBorder,
    // borderWidth: 1,
    borderRadius: 5,
    marginVertical: 15,
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8.84,
    elevation: 5,
  },
  buttonTextStyle: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: fonts.CourierPrimeRegular,
    color: '#FFFFFF',
    marginStart: 30,
  },
});
