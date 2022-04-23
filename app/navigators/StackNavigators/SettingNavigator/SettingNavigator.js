import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import routes from '../../../utils/routes';
import Setting from '../../../views/Setting/Setting';
import LocationSettings from '../../../views/Setting/LocationSettings';
import QCList from '../../../components/QCList/QCList';
import {modalStackTransition} from '../../navigatorHelpers';
import About from '../../../views/About/About';

const Stack = createStackNavigator();

const SettingNavigator = () => (
  <Stack.Navigator
    initialRouteName={routes.SettingScreen}
    screenOptions={{gesturesEnabled: false, headerShown: false}}>
    <Stack.Screen name={routes.SettingScreen} component={Setting} />
    <Stack.Screen
      name={routes.LocationSettingsScreen}
      component={LocationSettings}
    />
    <Stack.Screen name={routes.AboutScreen} component={About} />
    <Stack.Screen
      name={routes.QCListScreen}
      component={QCList}
      options={{...modalStackTransition}}
    />
  </Stack.Navigator>
);

export default SettingNavigator;
