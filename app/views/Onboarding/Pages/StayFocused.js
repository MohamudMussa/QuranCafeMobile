import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  PermissionsAndroid,
  Platform,
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
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import PlayerCover from '../../../assets/images/onBoard2.png';

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
    console.log('city===', city, '===contry===', country);
    dispatch(getSalahTimings(city, country, salahTimingSet));
  };

  const salahTimingSet = () => {
    setShowLoader(false);
    onPress();
  };
  const fetchUserLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('position=====', position);

        fetchCityAndCountry(latitude, longitude);
      },
      error => {
        console.log(error.code, error.message);
        Alert.alert('Error: ', error.message);
      },
      {
        timeout: 30000,
        maximumAge: 10000,
        enableHighAccuracy: true,
      },
    );
  };

  const fetchCityAndCountry = async (latitude, longitude) => {
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiYW5taXJ6YTc4NiIsImEiOiJjbGh5cDg1bjYwOTF0M2RwNXhxajNvbmVuIn0.Ss6Le00uQezXnuJmjsnoDQ`;
      console.log('Url======', url);
      const response = await axios.get(url);
      const data = response?.data;

      if (
        response.status === 200 &&
        data?.features &&
        data.features.length > 0
      ) {
        const cityFeature = data.features.find(feature =>
          feature.place_type.includes('place'),
        );
        const countryFeature = data.features.find(feature =>
          feature.place_type.includes('country'),
        );

        if (cityFeature && countryFeature) {
          const city = cityFeature.text;
          const country = countryFeature.text;
          setCity(city);
          setCountry(country);
        } else {
          throw new Error('City or country not found in response data');
        }
      } else {
        throw new Error('Failed to fetch location');
      }
    } catch (error) {
      console.error('Error fetching city and country: ', error);
    }
  };

  useEffect(() => {
    fetchUserLocation();
  }, []);
  return (
    // <SafeAreaView style={OnboardingStyles.pageContainer}>
    <ImageBackground
      resizeMode="stretch"
      source={PlayerCover}
      imageStyle={styles.backgroundImageStyle}
      style={styles.container}>
      <View style={{marginTop: 70}}>
        {/* <Text style={OnboardingStyles.titleStyle}>Stay Focused</Text>
        <Image
          source={Quran}
          style={[OnboardingStyles.imageStyle, styles.quranImageStyle]}
          resizeMode="contain"
        /> */}
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
    </ImageBackground>
  );
};

export default StayFocused;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImageStyle: {
    width: '100%',
    height: '100%',
  },
  ayahContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  ayahText: {
    fontFamily: fonts.CourierPrimeRegular,
    fontSize: 25,
    fontWeight: '400',
    color: '#FFFFFF',
    width: '85%',
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 24,
  },
  actionStyle: {
    marginTop: 'auto',
    marginBottom: 40,
  },
  actionButton: {
    marginBottom: 20,
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
