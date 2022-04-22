import {
  GET_ALL_COUNTRIES,
  GET_CITIES_OF_COUNTRY,
  SET_USER_CITY,
  SET_USER_COUNTRY,
} from '../actions/settingsAction/Types';

const initialState = {
  countries: [],
  cities: [],
  userCountry: '',
  userCity: '',
  loading: false,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_COUNTRIES.SUCCESS:
      return {
        ...state,
        countries: action.payload,
        loading: false,
      };
    case GET_ALL_COUNTRIES.FAILURE:
      return {
        ...state,
        loading: false,
      };
    case GET_CITIES_OF_COUNTRY.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CITIES_OF_COUNTRY.SUCCESS:
      return {
        ...state,
        cities: action.payload,
        loading: false,
      };
    case GET_CITIES_OF_COUNTRY.FAILURE:
      return {
        ...state,
        loading: false,
      };
    case SET_USER_CITY:
      return {
        ...state,
        userCity: action.payload,
      };
    case SET_USER_COUNTRY:
      return {
        ...state,
        userCountry: action.payload,
      };
    default:
      return state;
  }
};

export default settingsReducer;
