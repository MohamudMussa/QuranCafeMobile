import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import OnboardingStyles from '../styles';
import Quran from '../../../assets/images/quran3.png';
import fonts from '../../../utils/fonts';
import colors from '../../../utils/colors';
import OnboardingButton from '../../../components/onboarding/OnboardingButton/OnboardingButton';
import OnboardingStep from '../../../components/onboarding/OnboardingStep/OnboardingStep';
import PlayerCover from '../../../assets/images/onBoard3.png';

const FoodForSoul = ({onPress}) => {
  return (
    // <SafeAreaView style={OnboardingStyles.pageContainer}>
    <ImageBackground
      resizeMode="stretch"
      source={PlayerCover}
      imageStyle={styles.backgroundImageStyle}
      style={styles.container}>
      <View style={{marginTop: 70}}>
        {/* <Text style={OnboardingStyles.titleStyle}>Food for the soul</Text>
        <Image
          source={Quran}
          style={[OnboardingStyles.imageStyle, styles.imageStyle]}
          resizeMode="contain"
        /> */}
        <View style={styles.ayahContainer}>
          <Text style={styles.infoText}>No Adds.</Text>
          <Text style={styles.infoText}>No interuptions.</Text>
          <Text style={styles.infoText}>No descractions.</Text>
          <Text style={styles.infoDescription}>
            Just you and the words of your lord, food for the soul
          </Text>
        </View>
      </View>
      <View style={styles.actionStyle}>
        <View style={styles.actionButton}>
          <OnboardingButton
            text="Get Started"
            onPress={onPress}
            style={styles.buttonStyle}
          />
        </View>
        <OnboardingStep step={3} />
      </View>
    </ImageBackground>
  );
};

export default FoodForSoul;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ayahContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 10,
  },
  infoText: {
    fontFamily: fonts.CourierPrimeRegular,

    fontSize: 25,
    fontWeight: '400',
    color: '#FFFFFF',
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 24,
  },
  infoDescription: {
    fontFamily: fonts.CourierPrimeRegular,

    fontSize: 25,
    fontWeight: '400',
    color: '#FFFFFF',
    width: '90%',
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 24,
    marginTop: 40,
  },
  actionStyle: {
    marginTop: 'auto',
    marginBottom: 40,
  },
  actionButton: {
    marginBottom: 28,
  },
  buttonStyle: {
    width: 165,
  },
  OnbordingImageStyle: {
    width: 1080,
    height: 1080,
    left: -400,
    top: -470,
    transform: [{rotate: '-270 deg'}],
  },
  imageStyle: {
    marginTop: 20,
    height: '45%',
  },
  backgroundImageStyle: {
    width: '100%',
    height: '100%',
  },
});
