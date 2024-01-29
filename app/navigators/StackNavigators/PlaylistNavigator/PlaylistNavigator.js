import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import routes from '../../../utils/routes';
import Playlist from '../../../views/PlayList/Playlist';
import Favorite from '../../../views/PlayList/Favorite';
import colors from '../../../utils/colors';

const Stack = createStackNavigator();

const PlaylistNavigator = () => (
  <Stack.Navigator
    initialRouteName={routes.PlayListScreen}
    screenOptions={{gesturesEnabled: false}}>
    <Stack.Screen
      name={routes.PlayListScreen}
      component={Playlist}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={routes.FavoriteScreen}
      component={Favorite}
      options={{
        title: 'My Favorites',
        headerTintColor: colors.White,
        headerStyle: {backgroundColor: colors.Black},
      }}
    />
  </Stack.Navigator>
);

export default PlaylistNavigator;
