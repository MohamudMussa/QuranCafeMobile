import {
  GET_ALL_RECITATIONS,
  GET_IMAGE_LIST,
} from '../actions/recitationsAction/Types';

const initialState = {
  recitations: [],
  loading: false,
  error: null,
  imageList: [],
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
    case GET_IMAGE_LIST.SUCCESS: {
      return {
        ...state,
        imageList: action.payload,
      };
    }
    default:
      return state;
  }
};
