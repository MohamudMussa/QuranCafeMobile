import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import OnboardingStyles from '../styles';
import Quran from '../../../assets/images/quran3.png';
import fonts from '../../../utils/fonts';
import colors from '../../../utils/colors';
import OnboardingButton from '../../../components/onboarding/OnboardingButton/OnboardingButton';
import OnboardingStep from '../../../components/onboarding/OnboardingStep/OnboardingStep';

const FoodForSoul = ({onPress}) => {
  return (
    <SafeAreaView style={OnboardingStyles.pageContainer}>
      <View>
        <Text style={OnboardingStyles.titleStyle}>Food for the soul</Text>
        <Image
          source={Quran}
          style={[OnboardingStyles.imageStyle, styles.imageStyle]}
          resizeMode="contain"
        />
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
    </SafeAreaView>
  );
};

export default FoodForSoul;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ayahContainer: {
    marginTop: 20,
  },
  infoText: {
    fontFamily: fonts.ConsolasBold,
    fontSize: 14,
    fontWeight: '700',
    color: colors.White,
    width: '95%',
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 24,
  },
  infoDescription: {
    fontFamily: fonts.ConsolasBold,
    fontSize: 14,
    fontWeight: '700',
    color: colors.White,
    width: '60%',
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 24,
    marginTop: 40,
  },
  actionStyle: {
    marginBottom: 5,
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
});
