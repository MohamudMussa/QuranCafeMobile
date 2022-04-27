import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  Capability,
  useProgress,
  State,
  Event,
  useTrackPlayerEvents,
  RepeatMode,
} from 'react-native-track-player';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';
import RecitationCover from '../RecitationCover/RecitationCover';
import ThumbImage from '../../assets/images/Dot.png';
import RecitationPlayerAction from './RecitationPlayerAction';
import {useDispatch} from 'react-redux';
import {
  getAllRecitations,
  getCurrentTrackCover,
  thumbsUpRecitation,
} from '../../store/actions/recitationsAction/recitationActions';

const ReacitationPlayer = () => {
  const dispatch = useDispatch();

  const [currentTrack, setCurrentTrack] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [lastIndex, setLastIndex] = useState();
  const [currentTrackIndex, setCurrentTrackIndex] = useState();
  const [playerState, setPlayerState] = useState(State.None);
  const [loop, setLoop] = useState(false);
  const [currentTrackCover, setCurrentTrackCover] = useState();

  const {position, duration} = useProgress();

  // Subscribing to the events
  const events = [
    Event.PlaybackState,
    Event.PlaybackError,
    Event.PlaybackTrackChanged,
  ];

  useEffect(() => {
    TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.JumpForward,
        Capability.SeekTo,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
    });
    dispatch(getAllRecitations(onRecitationFetched));
    setCurrentTrackCover(dispatch(getCurrentTrackCover()));

    return () => {
      TrackPlayer.destroy();
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue(position / duration);
    }
  }, [position, duration, isSeeking]);

  useTrackPlayerEvents(events, event => {
    if (event.type === Event.PlaybackState) {
      setPlayerState(event.state);
      if (event.state === State.Playing) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    } else if (event.type === Event.PlaybackError) {
      Alert.alert(
        'Playback Error!!',
        'An error occured while playing the current track.',
      );
    } else if (event.type === Event.PlaybackQueueEnded) {
      Alert.alert('Playback', 'Playback Queue Ended');
    }
  });

  const onRecitationFetched = tracks => {
    TrackPlayer.add(tracks).then(() => {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
    });
    setLastIndex(tracks.length - 1);
    const shuffledIndex = Math.floor(Math.random() * tracks.length);
    setCurrentTrackIndex(shuffledIndex);
    setCurrentTrack(tracks[shuffledIndex]);
  };

  const handlePlay = () => {
    if (!isPlaying) {
      TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (isPlaying) {
      TrackPlayer.pause();
      setIsPlaying(false);
    }
  };

  const handleRepeat = () => {
    TrackPlayer.getRepeatMode().then(repeatMode => {
      if (repeatMode === RepeatMode.Off) {
        TrackPlayer.setRepeatMode(RepeatMode.Track);
        setLoop(true);
      } else {
        TrackPlayer.setRepeatMode(RepeatMode.Off);
        setLoop(false);
      }
    });
  };

  const handleSeek = async () => {
    let newPosition = await TrackPlayer.getPosition();
    newPosition += 10;
    if (newPosition > duration) {
      newPosition = duration;
    }
    setSliderValue(newPosition / duration);
    TrackPlayer.seekTo(newPosition);
  };

  const handlePrevious = async () => {
    TrackPlayer.skipToPrevious().catch(error => {
      Alert.alert('Error!!', 'Something went wrong');
    });

    if (currentTrackIndex === 0) {
      setCurrentTrack(lastIndex);
      return;
    }

    const previousTrack = await TrackPlayer.getTrack(currentTrackIndex - 1);
    setCurrentTrack(previousTrack);
    setCurrentTrackCover(dispatch(getCurrentTrackCover()));
  };
  const handleThumbsUp = () => {
    thumbsUpRecitation(
      currentTrack?.recitation_id,
      currentTrack.upvote,
      onSuccess,
    );
  };

  const onSuccess = async () => {
    TrackPlayer.updateMetadataForTrack(currentTrackIndex, {
      ...currentTrack,
      isLiked: true,
    }).then(async () => {
      const track = await TrackPlayer.getTrack(currentTrackIndex);
      setCurrentTrack(track);
    });
  };

  const getAudioTimeString = seconds => {
    const h = parseInt(seconds / (60 * 60), 10);
    const m = parseInt((seconds % (60 * 60)) / 60, 10);
    const s = parseInt(seconds % 60, 10);

    return (
      (h < 10 ? '0' + h : h) +
      ':' +
      (m < 10 ? '0' + m : m) +
      ':' +
      (s < 10 ? '0' + s : s)
    );
  };

  const slidingStarted = () => {
    setIsSeeking(true);
  };

  const slidingCompleted = async value => {
    await TrackPlayer.seekTo(value * duration);
    setIsSeeking(false);
  };

  const handleShuffle = async () => {
    try {
      const shuffledIndex = Math.floor(Math.random() * (lastIndex + 1));
      await TrackPlayer.skip(shuffledIndex);
      const shuffledTrack = await TrackPlayer.getTrack(shuffledIndex);
      setCurrentTrackIndex(shuffledIndex);
      setCurrentTrack(shuffledTrack);
      setCurrentTrackCover(dispatch(getCurrentTrackCover()));
    } catch (err) {
      Alert.alert('Error!!', 'Something went wrong');
    }
  };

  return (
    <View>
      <RecitationCover cover={currentTrackCover} />
      <View style={styles.recitationDetail}>
        <Text style={styles.surahNameStyle}>{currentTrack?.title}</Text>
        <Text style={styles.reciterStyle}>{currentTrack?.artist}</Text>

      </View>
      <Slider
        style={styles.sliderStyle}
        value={sliderValue}
        thumbImage={ThumbImage}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor={colors.White}
        maximumTrackTintColor={colors.Ecstasy}
        onSlidingStart={slidingStarted}
        onSlidingComplete={slidingCompleted}
      />
      <View style={styles.timeContainer}>
        {!!duration && (
          <Text style={styles.timeStyle}>{getAudioTimeString(position)}</Text>
        )}
        {!!duration && (
          <Text style={styles.timeStyle}>{getAudioTimeString(duration)}</Text>
        )}
      </View>
      <RecitationPlayerAction
        isPlaying={isPlaying}
        isLiked={currentTrack?.isLiked}
        recitationId={currentTrack?.recitation_id}
        onPlay={handlePlay}
        onPause={handlePause}
        onSeek={handleSeek}
        onPrevious={handlePrevious}
        onThumbsUp={handleThumbsUp}
        onShuffle={handleShuffle}
        onRepeat={handleRepeat}
        isOnLoop={loop}
        disable={playerState === 'loading' || playerState === 'idle'}
      />
    </View>
  );
};

export default ReacitationPlayer;

const styles = StyleSheet.create({
  reciterStyle: {
    fontSize: 14,
    lineHeight: 30,
    fontWeight: '400',
    fontFamily: fonts.ConsolasRegular,
    color: colors.White,
    marginTop: 0,
    textAlign: 'center',
  },
  surahNameStyle: {
    fontSize: 27,
    fontWeight: '400',
    fontFamily: fonts.ConsolasRegular,
    color: colors.White,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 7,
  },
  sliderStyle: {
    width: '90%',
    height: 2,
    alignSelf: 'center',
    marginTop: 37,
  },
  timeContainer: {
    width: '90%',
    height: 15,
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
    color: colors.White,
  },
  recitationDetail: {
    height: '12.7%',
  },
});
