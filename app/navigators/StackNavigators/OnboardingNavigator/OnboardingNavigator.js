import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import routes from '../../../utils/routes';
import Onboarding from '../../../views/Onboarding/Onboarding';
import QCList from '../../../components/QCList/QCList';
import {modalStackTransition} from '../../navigatorHelpers';

const Stack = createStackNavigator();

const OnboardingNavigator = () => (
  <Stack.Navigator
    initialRouteName={routes.Onboarding}
    screenOptions={{gesturesEnabled: false, headerShown: false}}>
    <Stack.Screen name={routes.OnboardingScreen} component={Onboarding} />
    <Stack.Screen
      name={routes.QCListScreen}
      component={QCList}
      options={{...modalStackTransition}}
    />
  </Stack.Navigator>
);

export default OnboardingNavigator;
