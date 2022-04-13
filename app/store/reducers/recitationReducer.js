import {GET_ALL_RECITATIONS} from '../actions/Types';

const initialState = {
  recitations: [],
  loading: false,
  error: null,
};

export const recitationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECITATIONS.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_RECITATIONS.SUCCESS:
      return {
        ...state,
        recitations: action.payload,
      };
    case GET_ALL_RECITATIONS.FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
