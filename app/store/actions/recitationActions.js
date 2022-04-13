import {supabaseClient} from '../../superbase/init';
import {GET_ALL_RECITATIONS} from './Types';

export const getAllRecitations = () => async dispatch => {
  supabaseClient
    .from('recitations')
    .select('video_url, id, up_vote')
    .then(response => {
      if (response.error) {
        dispatch({type: GET_ALL_RECITATIONS.FAILURE});
      } else {
        dispatch({type: GET_ALL_RECITATIONS.SUCCESS, payload: response.data});
      }
    })
    .catch(error => {
      dispatch({type: GET_ALL_RECITATIONS.FAILURE});
    });
};
