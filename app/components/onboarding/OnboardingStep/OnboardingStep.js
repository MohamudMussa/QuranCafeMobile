import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../../utils/colors';

const OnboardingStep = ({step}) => {
  return (
    <View style={styles.container}>
      <View style={styles.stepStyle(step, 1)} />
      <View style={styles.stepStyle(step, 2)} />
      <View style={[styles.stepStyle(step, 3), styles.colorStyle(step)]} />
    </View>
  );
};

export default OnboardingStep;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 36,
    height: 6,
    alignSelf: 'center',
  },
  stepStyle: (step, current) => ({
    width: step === current ? 24 : 6,
    borderRadius: 3,
    height: 6,
    backgroundColor: step === current ? colors.Black : colors.LightGrey,
    marginHorizontal: 2,
  }),
  colorStyle: step => ({
    backgroundColor: step === 3 ? colors.Ecstasy : colors.LightGrey,
  }),
});
