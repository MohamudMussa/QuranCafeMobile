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
      console.log('data::::', response);
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

export const setCityAndCountryFromStorage = () => async dispatch => {
  const countryInStorage = await AsyncStorage.getItem('country');
  const cityInStorage = await AsyncStorage.getItem('city');

  if (countryInStorage && cityInStorage) {
    dispatch(getSalahTimings(countryInStorage, cityInStorage));
  }

  dispatch({type: SET_USER_COUNTRY, payload: JSON.parse(countryInStorage)});
  dispatch({type: SET_USER_CITY, payload: JSON.parse(cityInStorage)});
};
