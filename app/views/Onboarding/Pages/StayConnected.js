import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import OnboardingStyles from '../styles';
import Quran from '../../../assets/images/quran1.png';
import fonts from '../../../utils/fonts';
import colors from '../../../utils/colors';
import OnboardingButton from '../../../components/onboarding/OnboardingButton/OnboardingButton';
import OnboardingStep from '../../../components/onboarding/OnboardingStep/OnboardingStep';
import OnboardingBackground from '../../../assets/images/onboarding1-bg.png';

const StayConnected = ({onPress}) => {
  return (
    <ImageBackground
      source={OnboardingBackground}
      style={OnboardingStyles.pageContainer}
      imageStyle={styles.onboardingBgImageStyle}>
      <View>
        <Text style={OnboardingStyles.titleStyle}>Stay Connected</Text>
        <Image
          source={Quran}
          style={[OnboardingStyles.imageStyle, styles.imageStyle]}
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
    </ImageBackground>
  );
};

export default StayConnected;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 35,
  },
  actionButton: {
    marginBottom: 20,
  },
  onboardingBgImageStyle: {
    width: 1080,
    height: 1080,
    top: -430,
    left: -200,
    transform: [{rotate: '130 deg'}],
  },
  imageStyle: {
    top: -25,
    zIndex: -1,
  },
});
