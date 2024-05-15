import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import ReacitationPlayer from '../../components/RecitationPlayer/RecitationPlayer';
import SalahTime from '../../components/SalahTime/SalahTime';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';
import PlayerCover from '../../assets/images/mainCover.png';
import HijriMoon from '../../assets/images/hijriMoon.png';

const Recitation = ({route}) => {
  const {hijriDate} = useSelector(state => state.salah);
  const favoriteSurah = route ? route?.params : {};
  return (
    <ImageBackground
      resizeMode="stretch"
      source={PlayerCover}
      imageStyle={styles.backgroundImageStyle}
      style={styles.container}>
      <View style={styles.innerContainer}>
        <SalahTime />
        <View style={styles.monthWrapper}>
          <Image source={HijriMoon} style={styles.warningBoxStyle} />

          <Text style={styles.monthText}>{`${hijriDate}`}</Text>
        </View>
        <View style={styles.contentContainer}>
          <ReacitationPlayer favoriteSurah={favoriteSurah} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Recitation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Black,
  },
  innerContainer: {
    flex: 1,
    marginTop: 40,
  },
  contentContainer: {
    flex: 1,
  },
  recitationCover: {
    width: '90%',
    height: 319,
  },
  monthWrapper: {
    height: 20,
    marginTop: 25,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  monthText: {
    fontFamily: fonts.CourierPrimeRegular,
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 10,
  },
  backgroundImageStyle: {
    width: '100%',
    height: '100%',
  },
  warningBoxStyle: {
    width: 20,
    height: 20,
    // marginStart: 16,
  },
});
