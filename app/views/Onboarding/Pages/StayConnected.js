import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import OnboardingStyles from '../styles';
import Quran from '../../../assets/images/quran1.png';
import fonts from '../../../utils/fonts';
import colors from '../../../utils/colors';
import OnboardingButton from '../../../components/onboarding/OnboardingButton/OnboardingButton';
import OnboardingStep from '../../../components/onboarding/OnboardingStep/OnboardingStep';

const StayConnected = ({onPress}) => {
  return (
    <View style={OnboardingStyles.pageContainer}>
      <View>
        <Text style={OnboardingStyles.titleStyle}>Stay Connected</Text>
        <Image
          source={Quran}
          style={OnboardingStyles.imageStyle}
          resizeMode="contain"
        />
        <View style={styles.ayahContainer}>
          <Text style={styles.ayahText}>
            This is a blessed Book which We have revealed to you ˹O Prophet˺ so
            that they may contemplate its verses, and people of reason may be
            mindful.
          </Text>
          <Text style={styles.ayahText}>[Saad 38:29].</Text>
        </View>
      </View>
      <View style={styles.actionStyle}>
        <View style={styles.actionButton}>
          <OnboardingButton text="Next" onPress={onPress} />
        </View>
        <OnboardingStep step={1} />
      </View>
    </View>
  );
};

export default StayConnected;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ayahContainer: {
    marginTop: 20,
  },
  ayahText: {
    fontFamily: fonts.SFProTextRegular,
    fontSize: 14,
    fontWeight: '400',
    color: colors.Black,
    width: '95%',
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 24,
  },
  actionStyle: {
    marginBottom: 10,
  },
  actionButton: {
    marginBottom: 28,
  },
});
