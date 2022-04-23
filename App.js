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
import OnboardingNavigator from './app/navigators/StackNavigators/OnboardingNavigator/OnboardingNavigator';
import store from './app/store/store';
import Onboarding from './app/views/Onboarding/Onboarding';
import SplashScreen from './app/views/SplashScreen/SplashScreen';

const App = () => {
  const [appReady, setAppReady] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  return (
    <Provider store={store}>
      {appReady ? (
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
