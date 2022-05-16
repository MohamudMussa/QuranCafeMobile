/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';

import {Provider} from 'react-redux';
import AppNavigator from './app/navigators/AppNavigator/AppNavigator';
import store from './app/store/store';
import SplashScreen from './app/views/SplashScreen/SplashScreen';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faPlay,
  faPause,
  faRepeat,
  faArrowLeft,
  faRandom,
  faChevronLeft,
  faHeart as faHeartSolid,
  faSquareXmark,
} from '@fortawesome/free-solid-svg-icons';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';

library.add(
  faPlay,
  faPause,
  faHeart,
  faRepeat,
  faArrowLeft,
  faRandom,
  faChevronLeft,
  faHeartSolid,
  faSquareXmark,
);

const App = () => {
  const [appReady, setAppReady] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isConnected, setIsConnected] = useState();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        Snackbar.show({
          text: 'No Internet Connection',
          duration: Snackbar.LENGTH_INDEFINITE,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Provider store={store}>
      {appReady ? (
        <AppNavigator onboarded={isOnboarded} />
      ) : (
        <SplashScreen
          setAppReady={setAppReady}
          setIsOnboarded={setIsOnboarded}
          isConnected={isConnected}
        />
      )}
    </Provider>
  );
};

export default App;
