import {GET_HIJRI_MONTH, GET_SALAH_TIMINGS} from '../actions/salahAction/Types';

const initialState = {
  timings: [],
  hijriDate: '',
  loading: false,
};

const salahReducer = (state = initialState, action) => {
  // console.log('action=====type===', action.type);

  // console.log('action=====payload===', action.payload);

  switch (action.type) {
    case GET_SALAH_TIMINGS.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SALAH_TIMINGS.SUCCESS:
      return {
        ...state,
        timings: action.payload,
        loading: false,
      };
    case GET_SALAH_TIMINGS.FAILURE:
      return {
        ...state,
        loading: false,
      };
    case GET_HIJRI_MONTH:
      return {
        ...state,
        hijriDate: action.payload,
      };
    default:
      return state;
  }
};

export default salahReducer;
