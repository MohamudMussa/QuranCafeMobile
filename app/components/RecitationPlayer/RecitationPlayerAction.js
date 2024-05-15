import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../utils/colors';
import icons from '../../utils/icons';
import RecitationPlayerButton from './RecitationPlayerButton';
import BackIcon from '../../assets/images/rec-back.png';
import RepeatIcon from '../../assets/images/pixelarticons_repeat.png';
import PlayIcon from '../../assets/images/pixelarticons_play.png';
import PauseIcon from '../../assets/images/pause.png';

import NextIcon from '../../assets/images/rec-next.png';
import HeartIcon from '../../assets/images/rec-heart.png';
import HeartIconFilled from '../../assets/images/heart-filled.png';

const RecitationPlayerAction = ({
  isPlaying,
  onPlay,
  onPause,
  onPrevious,
  onThumbsUp,
  disable,
  onShuffle,
  onRepeat,
  isOnLoop,
  isLiked,
  hasPrevTrack,
}) => {
  return (
    <View style={styles.container}>
      <RecitationPlayerButton
        icon={BackIcon}
        iconStyle={{width: 21, height: 18}}
        onPress={onPrevious}
        disable={!hasPrevTrack || disable}
      />
      <RecitationPlayerButton
        icon={RepeatIcon}
        onPress={onRepeat}
        disable={disable}
        isOnLoop={isOnLoop}
        iconStyle={{
          width: 28,
          height: 28,
          tintColor: isOnLoop ? '#FFFFFF' : '#C6AE8A',
        }}
      />
      <View
        style={{
          // backgroundColor: 'red',
          width: 31,
          height: 31,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {!isPlaying && (
          <RecitationPlayerButton
            icon={PlayIcon}
            onPress={onPlay}
            disable={disable}
            iconStyle={{width: 30, height: 30}}
          />
        )}
        {isPlaying && (
          <RecitationPlayerButton
            icon={PauseIcon}
            onPress={onPause}
            disable={disable}
            iconStyle={{width: 17, height: 19}}
          />
        )}
      </View>
      <RecitationPlayerButton
        icon={NextIcon}
        onPress={onShuffle}
        disable={disable}
        iconStyle={{width: 21, height: 18}}
      />
      <RecitationPlayerButton
        icon={HeartIcon}
        onPress={onThumbsUp}
        disable={isLiked || disable}
        fontType={isLiked ? 'fas' : 'far'}
        isLiked={isLiked}
        iconStyle={{
          width: 22,
          height: 20,
          tintColor: isLiked ? '#FFFFFF' : '#C6AE8A',
        }}
      />
    </View>
  );
};

export default RecitationPlayerAction;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '10.8%',
    backgroundColor: '#333333',
    borderRadius: 24,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 28,
    // marginBottom: 100,
  },
});
