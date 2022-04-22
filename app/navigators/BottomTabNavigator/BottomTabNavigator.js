import React from 'react';
import NavBarIcon from '../../components/NavbarIcon/NavbarIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../../utils/colors';
import routes from '../../utils/routes';
import Recitation from '../../views/Recitation/Recitation';
import fonts from '../../utils/fonts';
import SettingNavigator from '../StackNavigators/SettingNavigator/SettingNavigator';
import {getTabBarVisibility} from '../navigatorHelpers';
import {Share} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={routes.RecitationScreen}
      screenOptions={({route}) => {
        return {
          gesturesEnabled: false,
          tabBarActiveTintColor: colors.NutralBlack,
          tabBarInactiveTintColor: colors.NutralBlack,
          tabBarVisible: false,
          tabBarLabelStyle: {
            fontSize: 10,
            fontFamily: fonts.PoppinsRegular,
            fontWeight: '400',
          },
          tabBarStyle: {
            display: getTabBarVisibility(route) ? 'flex' : 'none',
          },
        };
      }}>
      <Tab.Screen
        name={routes.RecitationScreen}
        component={Recitation}
        options={{
          tabBarIcon: function ({focused}) {
            return <NavBarIcon focused={focused} icon="home" size={18} />;
          },
          tabBarLabel: 'Home',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={routes.Share}
        component={() => <NavBarIcon focused={false} icon="share" size={18} />}
        options={{
          tabBarIcon: function ({focused}) {
            return <NavBarIcon focused={focused} icon="share" size={18} />;
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
            return <NavBarIcon focused={focused} icon="setting" size={18} />;
          },
          tabBarLabel: 'Setting',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
