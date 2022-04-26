import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import ReacitationPlayer from '../../components/RecitationPlayer/RecitationPlayer';
import SalahTime from '../../components/SalahTime/SalahTime';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';
import PlayerCover from '../../assets/images/player-cover.png';

const Recitation = () => {
  const {hijriDate} = useSelector(state => state.salah);

  return (
    <ImageBackground
      resizeMode="cover"
      source={PlayerCover}
      imageStyle={styles.backgroundImageStyle}
      style={styles.container}>
      <View style={styles.innerContainer}>
        <SalahTime />
        <View style={styles.monthWrapper}>
          <Text style={styles.monthText}>{`${hijriDate}`}</Text>
        </View>
        <View style={styles.contentContainer}>
          <ReacitationPlayer />
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
  },
  monthText: {
    fontFamily: fonts.ConsolasRegular,
    color: colors.White,
    fontSize: 18,
    textAlign: 'center',
  },
  backgroundImageStyle: {
    width: '100%',
    height: 812,
  },
});
