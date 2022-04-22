import {GET_SALAH_TIMINGS} from '../actions/salahAction/Types';

const initialState = {
  timings: [],
  loading: false,
};

const salahReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default salahReducer;
