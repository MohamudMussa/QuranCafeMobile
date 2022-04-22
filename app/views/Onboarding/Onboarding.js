import React, {useRef} from 'react';
import {SafeAreaView, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {saveValue} from '../../storage/localStorage';
import routes from '../../utils/routes';
import FoodForSoul from './Pages/FoodForSoul';
import StayConnected from './Pages/StayConnected';
import StayFocused from './Pages/StayFocused';
import OnboardingStyle from './styles';

const Onboarding = ({navigation}) => {
  const pagerRef = useRef();

  const setOnboarding = () => {
    saveValue('isOnboarded', JSON.stringify(true));
    navigation.push(routes.BottomTabNavigator);
  };

  return (
    <SafeAreaView style={OnboardingStyle.container}>
      <PagerView
        ref={pagerRef}
        style={OnboardingStyle.pageViewStyle}
        initialPage={0}
        scrollEnabled={false}>
        <View key={1}>
          <StayConnected onPress={() => pagerRef.current.setPage(1)} />
        </View>
        <View key={2}>
          <StayFocused onPress={() => pagerRef.current.setPage(2)} />
        </View>
        <View key={3}>
          <FoodForSoul onPress={setOnboarding} />
        </View>
      </PagerView>
    </SafeAreaView>
  );
};

export default Onboarding;
