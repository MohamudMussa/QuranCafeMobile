import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import SplashImage from '../../assets/images/splash.png';
import {getImagesListFromStorage} from '../../store/actions/recitationsAction/recitationActions';
import colors from '../../utils/colors';

const SplashScreen = ({setAppReady}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getImagesListFromStorage(onSuccess));
  }, [dispatch]);

  const onSuccess = () => {
    setTimeout(() => {
      setAppReady(true);
    }, 3000);
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
