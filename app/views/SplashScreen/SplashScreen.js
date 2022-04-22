import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {ActivityIndicator, Image, SafeAreaView, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import SplashImage from '../../assets/images/splash.png';
import {getImagesListFromStorage} from '../../store/actions/recitationsAction/recitationActions';
import {setCityAndCountryFromStorage} from '../../store/actions/settingsAction/settingsAction';
import colors from '../../utils/colors';

const SplashScreen = ({setAppReady, setIsOnboarded}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getImagesListFromStorage(onSuccess));
    dispatch(setCityAndCountryFromStorage());
    (async () => {
      await checkIsOnboarded();
    })();
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
      <Image
        resizeMode="cover"
        source={SplashImage}
        style={styles.imageStyle}
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
    bottom: 100,
    alignSelf: 'center',
  },
});
