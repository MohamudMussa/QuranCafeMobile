import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveValue} from '../../../storage/localStorage';

import {
  GET_PLAYLIST,
  ADD_PLAYLIST,
  UPDATE_PLAYLIST,
  DELETE_PLAYLIST,
  STORE_PLAYLIST,
} from './Types';

export const addPlaylist = payload => {
  console.log('data check', payload);
  const action = {type: ADD_PLAYLIST.SUCCESS, payload};
  return action;
};

export const updatePlaylist = payload => {
  const action = {type: UPDATE_PLAYLIST.SUCCESS, payload};
  return action;
};

export const deletePlaylist = payload => {
  const action = {type: DELETE_PLAYLIST.SUCCESS, payload};
  return action;
};

export const getPlaylist = payload => {
  const action = {type: GET_PLAYLIST.SUCCESS, payload};
  return action;
};
export const storePlaylist = payload => {
  const action = {type: STORE_PLAYLIST.SUCCESS, payload};
  return action;
};
