import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {getNextSalahTiming} from '../../store/actions/salahAction/salahActions';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';
import WarningBox from '../../assets/images/memory_alert.png';
import FontIcon from '../general/FontIcon/FontIcon';
import icons from '../../utils/icons';

const SalahTime = () => {
  const dispatch = useDispatch();
  const [time, setTime] = useState({});
  const [reloadCounter, setReloadCounter] = useState(0);

  // useEffect(() => {
  //   if (!time?.salahTime) {
  //     setTime(dispatch(getNextSalahTiming()));
  //   }
  // }, [dispatch]);
  useEffect(() => {
    const fetchSalahTiming = () => {
      setTime(dispatch(getNextSalahTiming()));
      console.log('fetched time again ');
    };

    // Fetch initial Sala h timing
    fetchSalahTiming();

    // Fetch Salah timing every 20 seconds
    const interval = setInterval(fetchSalahTiming, 10000);

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Image source={WarningBox} style={styles.warningBoxStyle} />
      <Text
        style={
          styles.textStyle
        }>{`${time?.salahTime} Until ${time?.salahTimeName}`}</Text>
    </View>
  );
};

export default SalahTime;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#C6AE8A',
    borderRadius: 11,
    alignSelf: 'center',
    shadowColor: colors.Black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8.84,
    elevation: 5,
  },
  textStyle: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '500',
    fontFamily: fonts.CourierPrimeRegular,
    color: colors.Black,
    marginStart: 10,
  },
  warningBoxStyle: {
    width: 20,
    height: 20,
    // marginStart: 16,
  },
});
