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

const App = () => {
  const [appReady, setAppReady] = useState(false);
  return (
    <Provider store={store}>
      {appReady ? <AppNavigator /> : <SplashScreen setAppReady={setAppReady} />}
    </Provider>
  );
};

export default App;
