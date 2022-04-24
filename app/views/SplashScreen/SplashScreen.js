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
import SplashBackground from '../../assets/images/splash-bg.png';
import SplashQuran from '../../assets/images/splash-quran.png';
import SplashStars from '../../assets/images/stars.png';

const SplashScreen = ({setAppReady, setIsOnboarded}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getImagesListFromStorage(onSuccess));
    dispatch(setCityAndCountryFromStorage());
    (async () => {
      await checkIsOnboarded();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
    <SafeAreaView>
      <Image source={Logo} style={styles.logoStyle} />
      <View style={styles.splashTextWrapper}>
        <Text style={styles.splashText}>Ad free Quran.</Text>
        <Text style={styles.splashText}>Free Forever.</Text>
      </View>
      <ImageBackground
        source={SplashBackground}
        style={styles.splashBgStyle}
        resizeMethod="resize"
        resizeMode="stretch"
        imageStyle={styles.bgImageStyle}>
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
      </ImageBackground>
      <Image
        resizeMode="cover"
        source={SplashStars}
        style={styles.topStarsStyle}
      />
      <ActivityIndicator
        animating={true}
        style={styles.loader}
        size="large"
        color={colors.White}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  imageStyle: {
    width: '100%',
    height: '100%',
    marginBottom: 40,
  },
  loader: {
    position: 'absolute',
    bottom: -20,
    alignSelf: 'center',
  },
  logoStyle: {
    width: 130,
    height: 140,
    alignSelf: 'center',
    marginTop: 10,
  },
  splashTextWrapper: {
    marginTop: 25,
  },
  splashText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: fonts.PoppinsBold,
    textAlign: 'center',
    lineHeight: 30,
  },
  splashQuranStyle: {
    width: 314,
    height: 450,
    alignSelf: 'center',
    marginTop: 50,
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
});
