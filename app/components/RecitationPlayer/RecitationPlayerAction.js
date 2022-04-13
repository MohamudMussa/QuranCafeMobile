import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../utils/colors';
import icons from '../../utils/icons';
import RecitationPlayerButton from './RecitationPlayerButton';

const RecitationPlayerAction = () => {
  return (
    <View style={styles.container}>
      <RecitationPlayerButton icon={icons.ArrowLeftIcon} />
      <RecitationPlayerButton icon={icons.ReplayTenIcon} />
      <RecitationPlayerButton icon={icons.PlayIcon} />
      <RecitationPlayerButton icon={icons.HeartIconIcon} />
      <RecitationPlayerButton icon={icons.ArrowRightIcon} />
    </View>
  );
};

export default RecitationPlayerAction;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 67,
    backgroundColor: colors.Black,
    borderRadius: 24,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 28,
  },
});
