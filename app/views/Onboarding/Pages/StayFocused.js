import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import OnboardingStyles from '../styles';
import Quran from '../../../assets/images/quran2.png';
import fonts from '../../../utils/fonts';
import colors from '../../../utils/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllCountries,
  getCitiesOfCountry,
  setUserCity,
  setUserCountry,
} from '../../../store/actions/settingsAction/settingsAction';
import OnboardingButton from '../../../components/onboarding/OnboardingButton/OnboardingButton';
import OnboardingStep from '../../../components/onboarding/OnboardingStep/OnboardingStep';
import PickerInput from '../../../components/PickerInput/PickerInput';
import routes from '../../../utils/routes';
import {useNavigation} from '@react-navigation/core';
import {getSalahTimings} from '../../../store/actions/salahAction/salahActions';

const StayFocused = ({onPress}) => {
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch();
  const {countries, cities, loading} = useSelector(state => state.settings);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  const handleSetCountry = selected => {
    setCountry(selected);
    dispatch(setUserCountry(selected));
    dispatch(getCitiesOfCountry(selected));
  };

  const handleSetCity = selected => {
    setCity(selected);
    dispatch(setUserCity(selected));
  };

  const handleNext = () => {
    setShowLoader(true);
    dispatch(getSalahTimings(city, country, salahTimingSet));
  };

  const salahTimingSet = () => {
    setShowLoader(false);
    onPress();
  };

  return (
    <SafeAreaView style={OnboardingStyles.pageContainer}>
      <View>
        <Text style={OnboardingStyles.titleStyle}>Stay Focused</Text>
        <Image
          source={Quran}
          style={[OnboardingStyles.imageStyle, styles.quranImageStyle]}
          resizeMode="contain"
        />
        <View style={styles.ayahContainer}>
          <Text style={styles.ayahText}>
            Enter your country &amp; city and we’ll notify you when it’s time
            for Salah while you listen to Quran.
          </Text>
        </View>
        <View style={styles.countryDropdownWrapper}>
          <PickerInput
            placeholder="Enter your country"
            text={country}
            disabled={loading}
            onPress={() =>
              navigation.navigate(routes.QCListScreen, {
                title: 'Select Country',
                list: countries,
                labelSelector: 'name',
                onSelect: handleSetCountry,
              })
            }
          />
        </View>

        <View style={styles.cityDropdownWrapper}>
          <PickerInput
            placeholder="Enter your city"
            text={city}
            disabled={loading}
            onPress={() =>
              navigation.navigate(routes.QCListScreen, {
                title: 'Select City',
                list: cities,
                labelSelector: 'name',
                onSelect: handleSetCity,
              })
            }
          />
        </View>
      </View>
      <View style={styles.actionStyle}>
        <View style={styles.actionButton}>
          <OnboardingButton
            text="Next"
            disabled={!country || !city}
            onPress={handleNext}
          />
        </View>
        <OnboardingStep step={2} />
      </View>
      <ActivityIndicator
        animating={loading || showLoader}
        size="large"
        style={styles.loaderStyle}
      />
    </SafeAreaView>
  );
};

export default StayFocused;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ayahContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  ayahText: {
    fontFamily: fonts.ConsolasBold,
    fontSize: 14,
    fontWeight: '400',
    color: colors.White,
    width: '85%',
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 24,
  },
  actionStyle: {
    marginBottom: 5,
    zIndex: 9,
  },
  actionButton: {
    marginBottom: 28,
  },
  countryDropdownWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
  cityDropdownWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
  loaderStyle: {
    position: 'absolute',
    zIndex: 99,
    bottom: 200,
    alignSelf: 'center',
  },
  imageStyle: {
    width: 1080,
    height: 1080,
    top: -500,
    left: -400,
  },
  quranImageStyle: {
    marginTop: 20,
    height: '40%',
  },
});
