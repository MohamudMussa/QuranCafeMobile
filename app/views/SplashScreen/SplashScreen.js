import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Logo from '../../assets/images/logo.png';
import {getImagesListFromStorage} from '../../store/actions/recitationsAction/recitationActions';
import {setCityAndCountryFromStorage} from '../../store/actions/settingsAction/settingsAction';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';
import SplashQuran from '../../assets/images/quran1.png';
import SplashBack from '../../assets/images/splash-bgc.png';

import SplashStars from '../../assets/images/stars.png';
import {useIsConnected} from 'react-native-offline';

const SplashScreen = ({setAppReady, setIsOnboarded}) => {
  const dispatch = useDispatch();
  const isConnected = useIsConnected();

  useEffect(() => {
    if (isConnected) {
      dispatch(getImagesListFromStorage());
      dispatch(setCityAndCountryFromStorage(onSuccess));
      (async () => {
        await checkIsOnboarded();
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isConnected]);

  const checkIsOnboarded = async () => {
    const isOnboarded = await AsyncStorage.getItem('isOnboarded');
    if (isOnboarded) {
      setIsOnboarded(true);
    } else {
      setIsOnboarded(false);
    }
  };

  const onSuccess = () => {
    setTimeout(() => {
      setAppReady(true);
    }, 4000);
  };

  return (
    // <SafeAreaView style={styles.container}>
    <ImageBackground
      resizeMode="stretch"
      source={SplashBack}
      imageStyle={styles.backgroundImageStyle}
      style={styles.container}>
      <SafeAreaView>
        <View style={styles.splashTextWrapper}>
          <Text style={styles.splashText}>Ad free Quran.</Text>
          <Text style={styles.splashText}>Free Forever.</Text>
        </View>
        <Text style={styles.appTitleStyle}>Quran Cafe</Text>
        <View style={{marginTop: 'auto'}}>
          <ActivityIndicator
            animating={isConnected}
            style={styles.loader}
            size="large"
            color={colors.White}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Black,
  },
  backgroundImageStyle: {
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    marginBottom: 40,
  },
  loader: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  logoStyle: {
    width: 130,
    height: 140,
    alignSelf: 'center',
    marginTop: 10,
  },
  splashTextWrapper: {
    // position: 'absolute',
    // bottom: 35,
    // left: 15,
    // marginTop: 20,
    marginLeft: 10,
  },
  splashText: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: fonts.CourierPrimeRegular,

    color: colors.Black,
    lineHeight: 30,
  },
  splashQuranStyle: {
    width: 314,
    height: 450,
    alignSelf: 'center',
    marginTop: -40,
  },
  bgImageStyle: {
    width: 1040,
    height: 1041,
    top: -8,
    left: -460,
  },
  bottomStarStyle: {
    width: 200,
    height: 160,
    position: 'absolute',
    bottom: -80,
    right: -50,
    zIndex: 99,
  },
  topStarsStyle: {
    width: 200,
    height: 160,
    position: 'absolute',
    top: 100,
    right: -80,
  },
  appTitleStyle: {
    fontSize: 45,
    color: '#000000',
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: fonts.ConsolasBold,

    marginTop: 50,
  },
  netInfoContainer: {
    width: '80%',
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  netInfoText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FF2400',
    fontFamily: fonts.ConsolasBold,
  },
  netInfoButton: {
    width: 80,
    height: 35,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF2400',
    marginTop: 8,
    borderRadius: 20,
  },
  netInfoButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.White,
  },
});
