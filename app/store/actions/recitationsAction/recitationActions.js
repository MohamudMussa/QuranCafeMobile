import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {saveValue} from '../../../storage/localStorage';
import {supabaseClient} from '../../../superbase/init';
import {shuffle} from '../../../utils/utilities';
import {GET_ALL_RECITATIONS, GET_IMAGE_LIST} from './Types';

export const getAllRecitations = onSuccess => async dispatch => {
  const likedRecitationsInStorage = await AsyncStorage.getItem(
    'likedRecitations',
  );
  const likedRecitations = likedRecitationsInStorage
    ? JSON.parse(likedRecitationsInStorage)
    : [];
  supabaseClient
    .from('recitations')
    .select(
      'recitation_id, surah, video_url, mp3, id, up_vote, reciter:reciter_id ( name )',
    )
    .then(response => {
      if (response.error) {
        dispatch({type: GET_ALL_RECITATIONS.FAILURE});
      } else {
        const formattedTrackData = response.data.map(track => ({
          url: track.mp3, // Load media from the network
          title: track.surah,
          artist: track?.reciter?.name,
          recitation_id: track?.recitation_id,
          isLiked: likedRecitations.includes(track?.recitation_id),
          upvote: track.up_vote,
        }));
        const shuffledTrack = shuffle(formattedTrackData);
        onSuccess(shuffledTrack);
        dispatch({
          type: GET_ALL_RECITATIONS.SUCCESS,
          payload: shuffledTrack,
        });
      }
    })
    .catch(() => {
      dispatch({type: GET_ALL_RECITATIONS.FAILURE});
    });
};

export const getImagesListFromStorage = () => async dispatch => {
  const unParseList = await AsyncStorage.getItem('image_list');
  const parsedList = JSON.parse(unParseList);
  if (parsedList && parsedList.length > 0) {
    dispatch({type: GET_IMAGE_LIST.SUCCESS, payload: parsedList});
  }

  const {data, error} = await supabaseClient.storage.from('images').list();
  if (data && data.length > 0) {
    const nameListData = data.map(d => d.name);
    saveValue('image_list', JSON.stringify(nameListData));
    dispatch({type: GET_IMAGE_LIST.SUCCESS, payload: nameListData});
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

export const thumbsUpRecitation = async (recitationId, upvotes, onSuccess) => {
  const likedRecitationsInStorage = await AsyncStorage.getItem(
    'likedRecitations',
  );
  const {data, error} = await supabaseClient
    .from('recitations')
    .update({up_vote: upvotes + 1})
    .eq('recitation_id', recitationId);
  if (data) {
    const likedRecitations = likedRecitationsInStorage
      ? JSON.parse(likedRecitationsInStorage)
      : [];
    likedRecitations.push(recitationId);
    saveValue('likedRecitations', JSON.stringify(likedRecitations));
    onSuccess();
  }
  if (error) {
    console.log('error while updating upvote::', error);
  }
};
