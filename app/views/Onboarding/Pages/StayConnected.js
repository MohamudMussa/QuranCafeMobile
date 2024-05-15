import React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import OnboardingStyles from '../styles';
import Quran from '../../../assets/images/quran1.png';
import fonts from '../../../utils/fonts';
import colors from '../../../utils/colors';
import OnboardingButton from '../../../components/onboarding/OnboardingButton/OnboardingButton';
import OnboardingStep from '../../../components/onboarding/OnboardingStep/OnboardingStep';
import PlayerCover from '../../../assets/images/onBoard1.png';

const StayConnected = ({onPress}) => {
  return (
    // <SafeAreaView style={OnboardingStyles.pageContainer}>
    <ImageBackground
      resizeMode="stretch"
      source={PlayerCover}
      imageStyle={styles.backgroundImageStyle}
      style={styles.container}>
      <View style={{marginTop: 70}}>
        <Text style={OnboardingStyles.titleStyle}>﷽</Text>
        {/* <Image
          source={Quran}
          style={[OnboardingStyles.imageStyle, styles.imageStyle]}
          resizeMode="contain"
        /> */}
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
          <OnboardingButton text="Get Started" onPress={onPress} />
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
  backgroundImageStyle: {
    width: '100%',
    height: '100%',
  },
  ayahContainer: {
    marginTop: 20,
  },
  ayahText: {
    fontFamily: fonts.CourierPrimeRegular,
    fontSize: 25,
    fontWeight: '400',
    color: '#FFFFFF',
    width: '85%',
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 24,
  },
  actionStyle: {
    marginTop: 'auto',
    marginBottom: 40,
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
    top: 10,
    zIndex: -1,
    width: 322,
    height: '60%',
  },
});
