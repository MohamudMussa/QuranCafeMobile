import axios from 'axios';

export const getSalahTimings = () => dispatch => {
  axios
    .get(
      'http://api.aladhan.com/v1/calendarByCity?city=London&country=United Kingdom',
    )
    .then(response => {})
    .catch(error => {});
};
