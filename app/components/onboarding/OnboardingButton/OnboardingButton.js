import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../../../utils/colors';
import fonts from '../../../utils/fonts';

const OnboardingButton = ({style, text, onPress, disabled}) => {
  return (
    <TouchableOpacity
      style={[styles.container(disabled), style]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

OnboardingButton.defaultProps = {
  disabled: false,
};

export default OnboardingButton;

const styles = StyleSheet.create({
  container: disabled => ({
    width: 114,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: disabled ? colors.LightGrey : colors.Ecstasy,
    borderRadius: 10,
    alignSelf: 'center',
  }),
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: fonts.RailwayBold,
    color: colors.White,
  },
});
