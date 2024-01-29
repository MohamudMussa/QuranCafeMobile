import {
  GET_PLAYLIST,
  ADD_PLAYLIST,
  UPDATE_PLAYLIST,
  DELETE_PLAYLIST,
} from '../actions/playListAction/Types';

const initialState = {
  playlist: [],
  allPlaylists: [],
  loading: false,
};

const playListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYLIST.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PLAYLIST.SUCCESS:
      return {
        ...state,
        playlist: action.payload,
        loading: false,
      };
    case GET_PLAYLIST.FAILURE:
      return {
        ...state,
        loading: false,
      };
    case ADD_PLAYLIST.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_PLAYLIST.SUCCESS:
      return {
        ...state,
        playlist: action.payload,
        loading: false,
      };
    case ADD_PLAYLIST.FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default playListReducer;
