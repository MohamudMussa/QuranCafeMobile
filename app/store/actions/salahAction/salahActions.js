import axios from 'axios';
import {GET_HIJRI_MONTH, GET_SALAH_TIMINGS} from './Types';
import Moment from 'moment';
import {ordinal} from '../../../utils/utilities';

export const getSalahTimings =
  (city, country, onSuccess = () => {}) =>
  (dispatch, getState) => {
    const {userCity, userCountry} = getState().settings;
    const location = {
      city: city ? city : userCity,
      country: country ? country : userCountry,
    };

    dispatch({type: GET_SALAH_TIMINGS.REQUEST});
    axios
      .get(
        `https://api.aladhan.com/v1/calendarByCity?city=${location.city}&country=${location.country}`,
      )
      .then(response => {
        const timings = response.data.data.map(d => d.timings);
        const nowDay = Moment().format('DD');

        const hijri = response.data.data[nowDay - 1].date.hijri;
        const hijriDate = `${ordinal(hijri.day)} ${hijri.month.en} ${
          hijri.year
        }`;
        dispatch({type: GET_SALAH_TIMINGS.SUCCESS, payload: timings});
        dispatch({type: GET_HIJRI_MONTH, payload: hijriDate});
        onSuccess();
      })
      .catch(() => {
        dispatch({type: GET_SALAH_TIMINGS.FAILURE});
      });
  };

// const getKeyByValue = (object, value) => {
//   return Object.keys(object).find(key => object[key] === value);
// };

// export const getNextSalahTiming = () => (_, store) => {
//   const timings = store().salah?.timings;
//   console.log('timings====in getNextSalahTiming===', timings.length);
//   let salahTimeName = 'Fajr';
//   let salahTime;
//   const onlyPrayersTimings = timings.map(t => {
//     const time = t;
//     delete time.Sunrise;
//     delete time.Sunset;
//     delete time.Imsak;
//     delete time.Midnight;
//     return time;
//   });
//   console.log('onlyPrayersTimings=====', onlyPrayersTimings);
//   const nowDay = Moment().format('DD');
//   const timeNow = Moment().format('HH:mm');
//   console.log('nowday===', nowDay);
//   console.log('timeNow===', timeNow);
//   const timingsNow = Object(onlyPrayersTimings[nowDay - 1]);
//   const timingsNowValues = Object.values(onlyPrayersTimings[nowDay - 1]);
//   let nextTime;
//   for (let i = 0; i < timingsNowValues.length; i++) {
//     const current = Moment(timingsNowValues[i].split(' ')[0], 'HH:mm');
//     if (Moment(current).isAfter(Moment(timeNow, 'HH:mm'))) {
//       nextTime = timingsNowValues[i];
//       break;
//     }
//   }
//   if (nextTime) {
//     salahTimeName = getKeyByValue(timingsNow, nextTime);
//     salahTime = Moment.duration(
//       Moment(nextTime.split(' ')[0], 'HH:mm').diff(Moment(timeNow, 'HH:mm')),
//     );
//     const humanizeSalah = Moment.utc(
//       Moment.duration(salahTime, 'seconds').asMilliseconds(),
//     ).format('h[h] m[m]');

//     return {salahTimeName, salahTime: humanizeSalah};
//   }
//   nextTime = timingsNow.Fajr;
//   const diffToMidNight = Moment(timeNow, 'HH:mm').diff(
//     Moment('24:00', 'HH:mm'),
//   );
//   const diffAfterMidNight = Moment(nextTime.split(' ')[0], 'HH:mm').diff(
//     Moment('01:00', 'HH:mm'),
//   );
//   const addedDuration = Moment.duration(diffToMidNight + diffAfterMidNight);

//   salahTime = Moment.duration(addedDuration.add(1, 'hour'));
//   const humanizeSalah = Moment.utc(
//     Moment.duration(salahTime, 'seconds').asMilliseconds(),
//   ).format('h[h] m[m]');
//   return {salahTimeName, salahTime: humanizeSalah};
// };

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
};
export const getNextSalahTiming = () => (_, store) => {
  const timings = store().salah?.timings;
  // console.log('timings====in getNextSalahTiming===', timings.length);
  let salahTimeName = 'Fajr';
  let salahTime;
  const onlyPrayersTimings = timings.map(t => {
    const time = t;
    delete time.Sunrise;
    delete time.Sunset;
    delete time.Imsak;
    delete time.Midnight;
    return time;
  });

  const nowDay = Moment().format('DD');
  // const timeNow = '03:40';
  const timeNow = Moment().format('HH:mm');

  // console.log('nowday===', nowDay);
  // console.log('timeNow===', timeNow);
  const timingsNow = onlyPrayersTimings[nowDay - 1];
  const timingsNowValues = Object.values(onlyPrayersTimings[nowDay - 1]);
  // console.log('timingsNow======', timingsNow);
  // console.log('timingsNowValues=====', timingsNowValues);
  let nextTime;
  for (let i = 0; i < timingsNowValues.length; i++) {
    const current = Moment(timingsNowValues[i].split(' ')[0], 'HH:mm');
    // console.log('current in for====', current);
    if (Moment(current).isAfter(Moment(timeNow, 'HH:mm'))) {
      // console.log('timingsNowValues[i]====', timingsNowValues[i]);
      nextTime = timingsNowValues[i];
      salahTimeName = getKeyByValue(timingsNow, nextTime);
      salahTime = Moment.duration(
        Moment(nextTime.split(' ')[0], 'HH:mm').diff(Moment(timeNow, 'HH:mm')),
      );
      break;
    }
  }
  // console.log('nextTime after for====', nextTime);

  if (salahTime) {
    const humanizeSalah = salahTime.as('minutes');
    // console.log('humanize salah=====', humanizeSalah);

    if (humanizeSalah === 1) {
      return {salahTimeName, salahTime: '0h 1m'};
    } else if (humanizeSalah > 1 && humanizeSalah < 60) {
      return {salahTimeName, salahTime: `${humanizeSalah}m`};
    } else {
      return {
        salahTimeName,
        salahTime: Moment.utc(salahTime.asMilliseconds()).format('h[h] m[m]'),
      };
    }
  } else {
    // Handle the case when salahTime is not defined
    // You might want to return a default value or handle this case differently
    return {salahTimeName, salahTime: 'Unknown'};
  }
};
