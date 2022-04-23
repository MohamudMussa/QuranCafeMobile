import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Recitation from '../../views/Recitation/Recitation';
import routes from '../../utils/routes';
import BottomTabNavigator from '../BottomTabNavigator/BottomTabNavigator';
import OnboardingNavigator from '../StackNavigators/OnboardingNavigator/OnboardingNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = ({onboarded}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          onboarded ? routes.BottomTabNavigator : routes.OnboardingNavigator
        }
        screenOptions={{
          gesturesEnabled: false,
          headerShown: false,
        }}>
        <Stack.Screen
          name={routes.OnboardingNavigator}
          component={OnboardingNavigator}
        />
        <Stack.Screen
          name={routes.BottomTabNavigator}
          component={BottomTabNavigator}
        />
        <Stack.Screen name={routes.RecitationScreen} component={Recitation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
