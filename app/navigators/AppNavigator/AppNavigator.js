import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Recitation from '../../views/Recitation/Recitation';
import routes from '../../utils/routes';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={routes.RecitationScreen}
        screenOptions={{
          gesturesEnabled: false,
          headerShown: false,
        }}>
        <Stack.Screen name={routes.RecitationScreen} component={Recitation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
