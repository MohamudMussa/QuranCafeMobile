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
    width: 170,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: disabled ? colors.LightOrange : '#333333',
    borderRadius: 24,
    alignSelf: 'center',
  }),
  buttonText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: fonts.ConsolasBold,
    color: '#FFFFFF',
  },
});
