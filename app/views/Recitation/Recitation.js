import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ReacitationPlayer from '../../components/RecitationPlayer/RecitationPlayer';
import SalahTime from '../../components/SalahTime/SalahTime';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';

const Recitation = () => {
  const {hijriDate} = useSelector(state => state.salah);

  return (
    <SafeAreaView style={styles.container}>
      <SalahTime />
      <View style={styles.monthWrapper}>
        <Text style={styles.monthText}>{`${hijriDate}`}</Text>
      </View>
      <View style={styles.contentContainer}>
        <ReacitationPlayer />
      </View>
    </SafeAreaView>
  );
};

export default Recitation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
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
    fontFamily: fonts.PoppinsMedium,
    color: colors.Silver,
    fontSize: 18,
    textAlign: 'center',
  },
});
