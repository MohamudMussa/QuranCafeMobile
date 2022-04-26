import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import StackHeader from '../../components/headers/StackHeader/StackHeader';
import PickerInput from '../../components/PickerInput/PickerInput';
import {
  getAllCountries,
  getCitiesOfCountry,
  setUserCity,
  setUserCountry,
} from '../../store/actions/settingsAction/settingsAction';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';
import routes from '../../utils/routes';

const LocationSettings = () => {
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const dispatch = useDispatch();
  const {countries, cities, userCity, userCountry, loading} = useSelector(
    state => state.settings,
  );
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  useEffect(() => {
    if (userCountry) {
      setCountry(userCountry);
    }
    if (userCity) {
      setCity(userCity);
    }
  }, [userCity, userCountry]);

  const handleSetCountry = selected => {
    setCountry(selected);
    dispatch(setUserCountry(selected));
    dispatch(getCitiesOfCountry(selected));
  };

  const handleSetCity = selected => {
    setCity(selected);
    dispatch(setUserCity(selected));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerStyle}>
        <StackHeader title="Location" />
      </View>
      <View style={styles.informationWrapper}>
        <Text style={styles.informationText}>
          Enter your city and we’ll notify you when it’s time for the next Salah
          while you listen to Quran.
        </Text>
      </View>

      <View style={styles.countryDropdownWrapper}>
        <PickerInput
          placeholder="Enter your country"
          text={country}
          onPress={() =>
            navigation.navigate(routes.QCListScreen, {
              title: 'Select Country',
              list: countries,
              onSelect: handleSetCountry,
            })
          }
        />
      </View>

      <View style={styles.cityDropdownWrapper}>
        <PickerInput
          placeholder="Enter your city"
          text={city}
          onPress={() =>
            navigation.navigate(routes.QCListScreen, {
              title: 'Select City',
              list: cities,
              onSelect: handleSetCity,
            })
          }
        />
      </View>
      <ActivityIndicator animating={loading} size="large" />
    </SafeAreaView>
  );
};

export default LocationSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Black,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.Nutral5,
  },
  headerStyle: {
    height: 60,
    paddingTop: 10,
    backgroundColor: colors.Black,
  },
  informationWrapper: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 50,
  },
  informationText: {
    fontSize: 14,
    fontFamily: fonts.ConsolasRegular,
    fontWeight: '400',
    lineHeight: 24,
    color: colors.White,
    textAlign: 'center',
  },
  countryDropdownWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
  },
  cityDropdownWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
});
