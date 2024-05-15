import React from 'react';
import NavBarIcon from '../../components/NavbarIcon/NavbarIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../../utils/colors';
import routes from '../../utils/routes';
import Recitation from '../../views/Recitation/Recitation';
import fonts from '../../utils/fonts';
import SettingNavigator from '../StackNavigators/SettingNavigator/SettingNavigator';
import {getTabBarVisibility} from '../navigatorHelpers';
import {Image, Platform, Share} from 'react-native';
import Favorite from '../../views/Favorite/Favorite';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={routes.RecitationScreen}
      screenOptions={({route}) => {
        return {
          gesturesEnabled: false,
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: colors.Black,
          tabBarVisible: false,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: fonts.CourierPrimeRegular,

            fontWeight: '400',
            marginBottom: Platform.OS == 'android' ? 10 : 0,
            marginTop: Platform.OS == 'android' ? 0 : 10,
          },
          tabBarIconStyle: {
            marginTop: Platform.OS == 'android' ? 0 : 10,
          },
          tabBarStyle: {
            backgroundColor: '#C6AE8A',
            position: 'absolute',
            // bottom: 25,
            left: 20,
            right: 20,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            // display: getTabBarVisibility(route) ? 'flex' : 'none',
            // borderTopColor: colors.Black,
            height: Platform.OS == 'android' ? 70 : 90,
          },
        };
      }}>
      <Tab.Screen
        name={routes.RecitationScreen}
        component={Recitation}
        options={{
          tabBarIcon: function ({focused}) {
            return (
              <Image
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused && colors.White,
                }}
                source={require('../../assets/images/home-bbar-icon.png')}
              />
            );
          },
          tabBarLabel: 'Player',
          headerShown: false,
        }}
      />

      <Tab.Screen
        name={routes.Favorite}
        component={Favorite}
        options={{
          tabBarIcon: function ({focused}) {
            return (
              <Image
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused && colors.White,
                }}
                source={require('../../assets/images/heart-bbar-icon.png')}
                resizeMode="contain"
              />
            );
          },
          tabBarLabel: 'Favorite',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={routes.Share}
        component={() => <NavBarIcon focused={false} icon="share" size={18} />}
        options={{
          tabBarIcon: function ({focused}) {
            return (
              <Image
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused && colors.White,
                }}
                source={require('../../assets/images/share-bbar-icon.png')}
              />
            );
          },
          tabBarLabel: 'Share',
          headerShown: false,
        }}
        listeners={{
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
            Share.share({
              message: 'https://quran.cafe/',
            });
          },
        }}
      />
      <Tab.Screen
        name={routes.SettingNavigator}
        component={SettingNavigator}
        options={{
          tabBarIcon: function ({focused}) {
            return (
              <Image
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused && colors.White,
                }}
                source={require('../../assets/images/Setting-bbar-icon.png')}
              />
            );
          },
          tabBarLabel: 'Setting',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
