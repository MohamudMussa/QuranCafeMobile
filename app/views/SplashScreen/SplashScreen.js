import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
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
    <SafeAreaView style={styles.container}>
      <Image resizeMode="contain" source={Logo} style={styles.logoStyle} />
      <Text style={styles.appTitleStyle}>Quran Cafe</Text>
      <View style={styles.splashBgStyle}>
        <View>
          <Image
            source={SplashQuran}
            style={styles.splashQuranStyle}
            resizeMode="contain"
          />
          <Image
            source={SplashStars}
            style={styles.bottomStarStyle}
            resizeMode="contain"
          />
        </View>
      </View>
      <Image
        resizeMode="cover"
        source={SplashStars}
        style={styles.topStarsStyle}
      />
      <ActivityIndicator
        animating={isConnected}
        style={styles.loader}
        size="large"
        color={colors.White}
      />
      <View style={styles.splashTextWrapper}>
        <Text style={styles.splashText}>Ad free Quran.</Text>
        <Text style={styles.splashText}>Free Forever.</Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Black,
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
    position: 'absolute',
    bottom: 35,
    left: 15,
  },
  splashText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: fonts.ConsolasBold,
    color: colors.White,
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
    fontSize: 26,
    color: colors.White,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: fonts.ConsolasBold,
    marginTop: '4%',
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
    fontWeight: '700',
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
