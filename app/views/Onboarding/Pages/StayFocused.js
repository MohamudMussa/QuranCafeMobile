import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  LogBox,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
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
import axios from 'axios';

const StayFocused = ({onPress}) => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [permission, setPermission] = useState(true);
  const dispatch = useDispatch();
  const {countries, cities, loading} = useSelector(state => state.settings);
  const navigation = useNavigation();
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
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
  // Function to get permission for location
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('access', granted);
      if (granted === 'granted') {
        setPermission(true);
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        setPermission(false);
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getLocation = () => {
    setLoader(true);
    const result = requestLocationPermission();
    result.then(res => {
      //console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          async position => {
            //console.log('position', position);
            await reverseGeocode(position?.coords);
            setLoader(false);
          },
          error => {
            // See error code charts below.
            setLoader(false);
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 25000, maximumAge: 20000},
        );
      }
    });
  };
  
  const reverseGeocode = async ({latitude: lat, longitude: lng}) => {
    const url = `https://api.tomtom.com/search/2/reverseGeocode/${lat}%2C${lng}.json?returnSpeedLimit=false&radius=10000&returnRoadUse=false&allowFreeformNewLine=false&returnMatchType=false&view=Unified&key=z0d3JTs6YSJJBjS7CrsQFGV8I9zwAsbN`;

    try {
      const res = await axios.get(url);
      const place = res.data.addresses[0]?.address?.country;
      const state1 = res.data.addresses[0]?.address?.countrySubdivisionName;
      if (place) {
        setCountry(place);
        dispatch(setUserCountry(place));
      }
      if (state1) {
        setCity(state1);
        dispatch(setUserCity(state1));
      }
      console.log(place, state1);
    } catch (error) {
      console.log('error: ', error);
    }
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
          {permission ? (
            <View>
              <Text style={styles.ayahText}>
                Detect Location &amp; and set solat time accordingly
              </Text>
              {loader && (
                <ActivityIndicator
                  animating={loader}
                  style={styles.loader}
                  size="large"
                  color={colors.White}
                />
              )}
            </View>
          ) : (
            <Text style={styles.ayahText}>
              Enter your country &amp; city and we’ll notify you when it’s time
              for Salah while you listen to Quran.
            </Text>
          )}
        </View>
        {permission && (
          <View style={styles.actionButton}>
            <OnboardingButton text="Get Location" onPress={getLocation} />
          </View>
        )}
        {!permission && (
          <>
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
          </>
        )}
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
  loader: {
    position: 'absolute',
    bottom: 40,
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
