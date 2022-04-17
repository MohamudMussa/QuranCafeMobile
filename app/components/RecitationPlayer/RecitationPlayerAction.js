import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../utils/colors';
import icons from '../../utils/icons';
import RecitationPlayerButton from './RecitationPlayerButton';

const RecitationPlayerAction = ({
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onSeek,
  onThumbsUp,
  disable,
}) => {
  return (
    <View style={styles.container}>
      <RecitationPlayerButton
        icon={icons.ArrowLeftIcon}
        onPress={onPrevious}
        disable={disable}
      />
      <RecitationPlayerButton
        icon={icons.ReplayTenIcon}
        onPress={onSeek}
        disable={disable}
      />
      {!isPlaying && (
        <RecitationPlayerButton
          icon={icons.PlayIcon}
          onPress={onPlay}
          disable={disable}
        />
      )}
      {isPlaying && (
        <RecitationPlayerButton
          icon={icons.PauseIcon}
          onPress={onPause}
          disable={disable}
        />
      )}
      <RecitationPlayerButton
        icon={icons.HeartIcon}
        onPress={onThumbsUp}
        disable={disable}
      />
      <RecitationPlayerButton
        icon={icons.ArrowRightIcon}
        onPress={onNext}
        disable={disable}
      />
    </View>
  );
};

export default RecitationPlayerAction;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '10.8%',
    backgroundColor: colors.Black,
    borderRadius: 24,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 28,
  },
});
