import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {saveValue} from '../../../storage/localStorage';
import {supabaseClient} from '../../../superbase/init';
import {GET_ALL_RECITATIONS, GET_IMAGE_LIST} from './Types';

export const getAllRecitations = onSuccess => async dispatch => {
  supabaseClient
    .from('recitations')
    .select('surah, video_url, mp3, id, up_vote, reciter:reciter_id ( name )')
    .then(response => {
      if (response.error) {
        dispatch({type: GET_ALL_RECITATIONS.FAILURE});
      } else {
        const formattedTrackData = response.data.map(track => ({
          url: track.mp3, // Load media from the network
          title: track.surah,
          artist: track?.reciter?.name,
        }));
        onSuccess(formattedTrackData);
        dispatch({
          type: GET_ALL_RECITATIONS.SUCCESS,
          payload: formattedTrackData,
        });
      }
    })
    .catch(() => {
      dispatch({type: GET_ALL_RECITATIONS.FAILURE});
    });
};

export const getImagesListFromStorage = onSuccess => async dispatch => {
  const unParseList = await AsyncStorage.getItem('image_list');
  const parsedList = JSON.parse(unParseList);
  if (parsedList && parsedList.length > 0) {
    dispatch({type: GET_IMAGE_LIST.SUCCESS, payload: parsedList});
    return onSuccess();
  }

  const {data, error} = await supabaseClient.storage.from('images').list();
  if (data && data.length > 0) {
    const nameListData = data.map(d => d.name);
    saveValue('image_list', JSON.stringify(nameListData));
    dispatch({type: GET_IMAGE_LIST.SUCCESS, payload: nameListData});
    return onSuccess();
  }

  if (error) {
    Alert.alert('Error!!', 'Error while fetching cover list');
  }
};

export const getCurrentTrackCover = () => (_, getState) => {
  const imageList = getState().recitations?.imageList;
  const currentImageName =
    imageList[Math.floor(Math.random() * imageList.length)];
  const {publicURL, error} = supabaseClient.storage
    .from('images')
    .getPublicUrl(currentImageName);

  if (error) {
    console.log(`error while fetching image::${currentImageName}`);
  }

  return publicURL;
};
