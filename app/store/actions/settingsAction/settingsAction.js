import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveValue} from '../../../storage/localStorage';
import countries from '../../../utils/countryList/country.json';

import {
  GET_ALL_COUNTRIES,
  GET_CITIES_OF_COUNTRY,
  SET_USER_CITY,
  SET_USER_COUNTRY,
} from './Types';
import axios from 'axios';
import {getSalahTimings} from '../salahAction/salahActions';
import Geolocation from '@react-native-community/geolocation';

export const getAllCountries = () => dispatch => {
  dispatch({type: GET_ALL_COUNTRIES.SUCCESS, payload: countries});
};

export const getCitiesOfCountry = country => dispatch => {
  const axiosInstance = axios.create({
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
  dispatch({type: GET_CITIES_OF_COUNTRY.REQUEST});

  axiosInstance
    .post('https://countriesnow.space/api/v0.1/countries/cities', {
      country: country,
    })
    .then(response => {
      const {data} = response.data;
      dispatch({type: GET_CITIES_OF_COUNTRY.SUCCESS, payload: data});
    })
    .catch(() => {
      dispatch({type: GET_CITIES_OF_COUNTRY.FAILURE});
    });
};

export const setUserCountry = country => dispatch => {
  saveValue('country', JSON.stringify(country));
  dispatch({type: SET_USER_COUNTRY, payload: country});
};

export const setUserCity = city => dispatch => {
  saveValue('city', JSON.stringify(city));
  dispatch({type: SET_USER_CITY, payload: city});
};

// export const setCityAndCountryFromStorage = onSuccess => async dispatch => {
//   const countryInStorage = await AsyncStorage.getItem('country');
//   const cityInStorage = await AsyncStorage.getItem('city');
//   console.log('countryInStorage=====', countryInStorage);
//   console.log('cityInStorage=====', cityInStorage);

//   dispatch({type: SET_USER_COUNTRY, payload: JSON.parse(countryInStorage)});
//   dispatch({type: SET_USER_CITY, payload: JSON.parse(cityInStorage)});

//   if (countryInStorage && cityInStorage) {
//     dispatch(getSalahTimings(countryInStorage, cityInStorage, onSuccess));
//   } else {
//     onSuccess();
//   }
// };
export const setCityAndCountryFromStorage = onSuccess => async dispatch => {
  const countryInStorage = await AsyncStorage.getItem('country');
  const cityInStorage = await AsyncStorage.getItem('city');
  console.log('countryInStorage=====', countryInStorage);
  console.log('cityInStorage=====', cityInStorage);

  if (countryInStorage && cityInStorage) {
    dispatch({type: SET_USER_COUNTRY, payload: JSON.parse(countryInStorage)});
    dispatch({type: SET_USER_CITY, payload: JSON.parse(cityInStorage)});
    dispatch(
      getSalahTimings(
        JSON.parse(countryInStorage),
        JSON.parse(cityInStorage),
        onSuccess,
      ),
    );
  } else {
    fetchUserLocation(onSuccess, dispatch);
  }
};

const fetchUserLocation = (onSuccess, dispatch) => {
  Geolocation.getCurrentPosition(
    position => {
      const {latitude, longitude} = position.coords;
      console.log('position=====', position);
      fetchCityAndCountry(latitude, longitude, dispatch, onSuccess);
    },
    error => {
      console.log(error.code, error.message);
      // alert('Error: ', error.message);
      onSuccess(); // Call onSuccess callback if there's an error
    },
    {
      timeout: 30000,
      maximumAge: 10000,
      enableHighAccuracy: true,
    },
  );
};

const fetchCityAndCountry = async (
  latitude,
  longitude,
  dispatch,
  onSuccess,
) => {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiYW5taXJ6YTc4NiIsImEiOiJjbGh5cDg1bjYwOTF0M2RwNXhxajNvbmVuIn0.Ss6Le00uQezXnuJmjsnoDQ`;
    console.log('Url======', url);
    const response = await axios.get(url);
    const data = response?.data;

    if (response.status === 200 && data?.features && data.features.length > 0) {
      const cityFeature = data.features.find(feature =>
        feature.place_type.includes('place'),
      );
      const countryFeature = data.features.find(feature =>
        feature.place_type.includes('country'),
      );

      if (cityFeature && countryFeature) {
        const city = cityFeature.text;
        const country = countryFeature.text;
        dispatch({type: SET_USER_CITY, payload: city});
        dispatch({type: SET_USER_COUNTRY, payload: country});
        dispatch(getSalahTimings(country, city, onSuccess));
        onSuccess(); // Call onSuccess callback after setting city and country
      } else {
        throw new Error('City or country not found in response data');
      }
    } else {
      throw new Error('Failed to fetch location');
    }
  } catch (error) {
    console.error('Error fetching city and country: ', error);
    onSuccess(); // Call onSuccess callback if there's an error
  }
};
