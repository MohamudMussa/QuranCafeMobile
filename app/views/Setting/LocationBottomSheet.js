import {
  View,
  Text,
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

import {openComposer} from 'react-native-email-link';
import StackHeader from '../../components/headers/StackHeader/StackHeader';
import LogoWithText from '../../assets/images/logo.png';
import colors from '../../utils/colors';
import OnboardingButton from '../../components/onboarding/OnboardingButton/OnboardingButton';
import PlayerCover from '../../assets/images/mainCover.png';
import fonts from '../../utils/fonts';
import {
  getAllCountries,
  getCitiesOfCountry,
  setUserCity,
  setUserCountry,
} from '../../store/actions/settingsAction/settingsAction';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import routes from '../../utils/routes';
import PickerInput from '../../components/PickerInput/PickerInput';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import QCListBottomSheet from './QCListBottomSheet';

export default function LocationBottomSheet({
  showBottomSheet,
  setShowBottomSheet,
}) {
  const refRBSheet = useRef();

  useEffect(() => {
    if (showBottomSheet) {
      refRBSheet.current.open();
    } else {
      refRBSheet.current.close();
    }
  }, [showBottomSheet]);
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

      const response = await axios.get(url);
      const data = response?.data;

      if (
        response.status === 200 &&
        data?.features &&
        data.features.length > 0
      ) {
        const cityData = data.features[0];
        const city = cityData.context.find(context =>
          context.id.includes('place'),
        );
        const country = cityData.context.find(context =>
          context.id.includes('country'),
        );

        if (city && country) {
          setCity(city.text);
          setCountry(country.text);
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

  const [showQcListCountry, setShowQcListCountry] = useState(false);
  const [showQcListCity, setShowQcListCity] = useState(false);

  return (
    <RBSheet
      ref={refRBSheet}
      draggable={true}
      closeOnDragDown={true}
      dragOnContent={true}
      dragFromTopOnly={true}
      onClose={v => {
        setShowBottomSheet(false);
      }}
      closeOnPressMask={true}
      // height={600}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        draggableIcon: {
          width: 120,
          height: 7,
          // borderRadius: 3,
          backgroundColor: '#C6AE8A',
          alignSelf: 'center',
          marginTop: 10,
          borderRadius: 14,
        },

        container: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: 700,
          backgroundColor: 'rgba(0,0,0,0.1)',
        },
      }}>
      <ImageBackground
        resizeMode="stretch"
        source={PlayerCover}
        imageStyle={styles.backgroundImageStyle}
        style={styles.container}>
        {/* <View style={styles.draggableHandle}></View> */}
        <View style={styles.informationWrapper}>
          <Text style={styles.informationText}>
            Enter your city and we’ll notify you when it’s time for the next
            Salah while you listen to Quran.
          </Text>
        </View>

        <View style={styles.countryDropdownWrapper}>
          <PickerInput
            placeholder="Enter your country"
            text={country}
            onPress={() => {
              //   navigation.navigate(routes.QCListScreen, {
              //     title: 'Select Country',
              //     list: countries,
              //     onSelect: handleSetCountry,
              //   })
              setShowQcListCountry(true);
            }}
          />
        </View>

        <View style={styles.cityDropdownWrapper}>
          <PickerInput
            placeholder="Enter your city"
            text={city}
            onPress={() => {
              //   navigation.navigate(routes.QCListScreen, {
              //     title: 'Select City',
              //     list: cities,
              //     onSelect: handleSetCity,
              //   })
              setShowQcListCity(true);
            }}
          />
        </View>
        <ActivityIndicator animating={loading} size="large" />
      </ImageBackground>
      {showQcListCountry && (
        <QCListBottomSheet
          setShowBottomSheet={setShowQcListCountry}
          showBottomSheet={showQcListCountry}
          onSelect={handleSetCountry}
          list={countries}
          title={'Select Country'}
        />
      )}
      {showQcListCity && (
        <QCListBottomSheet
          setShowBottomSheet={setShowQcListCity}
          showBottomSheet={showQcListCity}
          onSelect={handleSetCity}
          list={cities}
          title={'Select City'}
        />
      )}
    </RBSheet>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Black,
  },
  backgroundImageStyle: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.Nutral5,
  },
  headerStyle: {
    height: 90,
    paddingTop: 45,
    backgroundColor: '#C6AE8A',
  },
  informationWrapper: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 50,
  },
  informationText: {
    fontSize: 16,
    fontFamily: fonts.ConsolasRegular,
    fontWeight: '400',
    lineHeight: 24,
    color: '#FFFFFF',
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
