import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';

const SalahTime = () => (
  <View style={styles.container}>
    <Text style={styles.textStyle}>23 mins - left until Duhur</Text>
  </View>
);

export default SalahTime;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 50,
    borderRadius: 40,
    backgroundColor: colors.ThemeRed,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '500',
    fontFamily: fonts.PoppinsMedium,
    color: colors.White,
  },
});