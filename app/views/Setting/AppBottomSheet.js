import {
  View,
  Text,
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

import {openComposer} from 'react-native-email-link';
import StackHeader from '../../components/headers/StackHeader/StackHeader';
import LogoWithText from '../../assets/images/logo.png';
import colors from '../../utils/colors';
import OnboardingButton from '../../components/onboarding/OnboardingButton/OnboardingButton';
import PlayerCover from '../../assets/images/mainCover.png';
import fonts from '../../utils/fonts';
export default function AppBottomSheet({showBottomSheet, setShowBottomSheet}) {
  const refRBSheet = useRef();

  useEffect(() => {
    if (showBottomSheet) {
      refRBSheet.current.open();
    } else {
      refRBSheet.current.close();
    }
  }, [showBottomSheet]);
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
    <RBSheet
      ref={refRBSheet}
      draggable={true}
      closeOnDragDown={true}
      dragOnContent={true}
      dragFromTopOnly={true}
      onClose={v => {
        setShowBottomSheet(false);
      }}
      closeOnPressMask={true}
      // height={600}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        draggableIcon: {
          width: 120,
          height: 7,
          // borderRadius: 3,
          backgroundColor: '#C6AE8A',
          alignSelf: 'center',
          marginTop: 10,
          borderRadius: 14,
        },

        container: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: 700,
          backgroundColor: 'rgba(0,0,0,0.1)',
        },
      }}>
      <ImageBackground
        resizeMode="stretch"
        source={PlayerCover}
        imageStyle={styles.backgroundImageStyle}
        style={styles.container}>
        {/* <View style={styles.draggableHandle}></View> */}
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
          <Text style={[styles.text, styles.text3]}>
            Ad free, free forever.
          </Text>
          <Text style={[styles.text, styles.text4]}>Version 1.0</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <OnboardingButton
            text="Contact Us"
            style={styles.buttonStyle}
            onPress={handleOnPress}
          />
        </View>
      </ImageBackground>
    </RBSheet>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.Black,
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
  backgroundImageStyle: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontFamily: fonts.CourierPrimeRegular,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 18.4,
    color: '#FFFFFF',
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
  headerStyle: {
    height: 90,
    paddingTop: 45,
    backgroundColor: '#C6AE8A',
  },
  draggableHandle: {
    width: 120,
    height: 7,
    // borderRadius: 3,
    backgroundColor: '#C6AE8A',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 14,
  },
});
