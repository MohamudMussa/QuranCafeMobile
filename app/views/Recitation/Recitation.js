import React, {useEffect} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import ReacitationPlayer from '../../components/RecitationPlayer/RecitationPlayer';
import SalahTime from '../../components/SalahTime/SalahTime';
import {getAllRecitations} from '../../store/actions/recitationActions';
import colors from '../../utils/colors';

const Recitation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecitations());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SalahTime />
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
});
