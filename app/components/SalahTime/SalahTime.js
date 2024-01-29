import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {getNextSalahTiming} from '../../store/actions/salahAction/salahActions';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';
import WarningBox from '../../assets/images/warning-box.png';
import FontIcon from '../general/FontIcon/FontIcon';
import icons from '../../utils/icons';

const SalahTime = () => {
  const dispatch = useDispatch();
  const [time, setTime] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dispatch(getNextSalahTiming()));
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return (
    <>
      {Object.keys(time)?.length === 0 ? null : (
        <View style={styles.container}>
          <View style={styles.left}>
            <Image source={WarningBox} style={styles.warningBoxStyle} />
            <Text
              style={
                styles.textStyle
              }>{`${time.salahTime} until ${time.salahTimeName}`}</Text>
          </View>
          <View style={styles.squareIcon}>
            <FontIcon
              size={20}
              color={colors.Silver2}
              icon={icons.SquareXMark}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default SalahTime;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    width: '88%',
    height: '6.5%',
    backgroundColor: colors.BlackShade,
    alignItems: 'center',
    justifyContent: 'space-between',
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
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '500',
    fontFamily: fonts.ConsolasRegular,
    color: colors.White,
    marginStart: 30,
  },
  warningBoxStyle: {
    width: 24,
    height: 24,
    marginStart: 16,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  squareIcon: {
    marginRight: 16,
  },
});
