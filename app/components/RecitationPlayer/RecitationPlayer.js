import Slider from '@react-native-community/slider';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';
import RecitationCover from '../RecitationCover/RecitationCover';
import ThumbImage from '../../assets/images/Dot.png';
import RecitationPlayerAction from './RecitationPlayerAction';

const ReacitationPlayer = () => {
  return (
    <View>
      <RecitationCover />
      <Text style={styles.reciterStyle}>Sh Shuraim</Text>
      <Text style={styles.surahNameStyle}>Surah Yusuf</Text>
      <Slider
        style={styles.sliderStyle}
        value={0.5}
        thumbImage={ThumbImage}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor={colors.Black}
        maximumTrackTintColor={colors.HawkesBlue}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timeStyle}>12.5</Text>
        <Text style={styles.timeStyle}>47.32</Text>
      </View>
      <RecitationPlayerAction />
    </View>
  );
};

export default ReacitationPlayer;

const styles = StyleSheet.create({
  reciterStyle: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '500',
    fontFamily: fonts.PoppinsMedium,
    color: colors.NutralBlack,
    marginTop: 40,
    textAlign: 'center',
  },
  surahNameStyle: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: fonts.PoppinsRegular,
    color: colors.NutralBlack,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 7,
    opacity: 0.5,
  },
  sliderStyle: {
    width: '90%',
    height: 2,
    alignSelf: 'center',
    marginTop: 37,
  },
  timeContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  timeStyle: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: fonts.PoppinsRegular,
    color: colors.Black,
  },
});
