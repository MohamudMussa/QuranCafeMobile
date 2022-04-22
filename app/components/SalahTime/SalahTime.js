import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {getNextSalahTiming} from '../../store/actions/salahAction/salahActions';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';

const SalahTime = () => {
  const dispatch = useDispatch();
  const [time, setTime] = useState({});

  useEffect(() => {
    if (!time?.salahTime) {
      setTime(dispatch(getNextSalahTiming()));
    }
    const interval = setInterval(() => {
      setTime(dispatch(getNextSalahTiming()));
    }, 60000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text
        style={
          styles.textStyle
        }>{`${time.salahTime} - left until ${time.salahTimeName}`}</Text>
    </View>
  );
};

export default SalahTime;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '6.55%',
    borderRadius: 40,
    backgroundColor: colors.Ecstasy,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '500',
    fontFamily: fonts.PoppinsMedium,
    color: colors.White,
  },
});
