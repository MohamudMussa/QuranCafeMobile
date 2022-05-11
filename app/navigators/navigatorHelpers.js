import {getFocusedRouteNameFromRoute} from '@react-navigation/core';
import {CardStyleInterpolators} from '@react-navigation/stack';
import routes from '../utils/routes';

const visibilityScreens = [routes.AboutScreen];

export const modalStackTransition = {
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
};

export const getTabBarVisibility = route => {
  const routeName =
    getFocusedRouteNameFromRoute(route) ?? routes.RecitationScreen;
  return !visibilityScreens.includes(routeName);
};
