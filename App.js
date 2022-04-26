/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';

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
  return (
    <Provider store={store}>
      {false ? (
        <AppNavigator onboarded={isOnboarded} />
      ) : (
        <SplashScreen
          setAppReady={setAppReady}
          setIsOnboarded={setIsOnboarded}
        />
      )}
    </Provider>
  );
};

export default App;
