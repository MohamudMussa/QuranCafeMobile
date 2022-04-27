import React from 'react';
import {Alert, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {openComposer} from 'react-native-email-link';
import StackHeader from '../../components/headers/StackHeader/StackHeader';
import LogoWithText from '../../assets/images/logo.png';
import fonts from '../../utils/fonts';
import colors from '../../utils/colors';
import OnboardingButton from '../../components/onboarding/OnboardingButton/OnboardingButton';

const About = () => {
  const handleOnPress = () => {
    openComposer({
      to: 'qurancafe@email.com',
      subject: 'I have a question',
      body: 'Hi, can you help me with...',
    }).catch(() => {
      Alert.alert('Contact Us', 'Please contact us at qurancafe@email.com');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StackHeader title="About Quran Cafe" />
      <Image
        source={LogoWithText}
        style={styles.logoStyle}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Stay focused while listening to a unique selection of Quran
          recitations from all around the world.
        </Text>
        <Text style={[styles.text, styles.text2]}>
          No ads. No interruptions. No distractions. Just you and the words of
          your lord, food for the soul.
        </Text>
        <Text style={[styles.text, styles.text3]}>Ad free, free forever.</Text>
        <Text style={[styles.text, styles.text4]}>Version 1.0</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <OnboardingButton
          text="Contact Us"
          style={styles.buttonStyle}
          onPress={handleOnPress}
        />
      </View>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Black,
  },
  logoStyle: {
    width: 129,
    height: 141,
    marginTop: 40,
    alignSelf: 'center',
    marginBottom: 30,
  },
  textContainer: {
    width: '85%',
    alignSelf: 'center',
    marginTop: 20,
  },
  text: {
    fontFamily: fonts.ConsolasRegular,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 18.4,
    color: colors.White,
  },
  text2: {
    marginTop: 25,
  },
  text3: {
    marginTop: 30,
  },
  text4: {
    marginTop: 35,
  },
  buttonStyle: {
    width: '85%',
  },
  buttonWrapper: {
    marginTop: 70,
  },
});
