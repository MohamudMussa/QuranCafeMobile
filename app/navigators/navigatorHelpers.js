import {CardStyleInterpolators} from '@react-navigation/stack';
import routes from '../utils/routes';

const visibilityScreens = [routes.SettingNavigator];

export const modalStackTransition = {
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
};

export const getTabBarVisibility = route => {
  const routeName = route.name ?? routes.RecitationScreen;
  return !visibilityScreens.includes(routeName);
};
