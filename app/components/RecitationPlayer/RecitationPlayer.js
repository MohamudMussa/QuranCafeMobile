import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  Capability,
  useProgress,
  State,
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';
import RecitationCover from '../RecitationCover/RecitationCover';
import ThumbImage from '../../assets/images/Dot.png';
import RecitationPlayerAction from './RecitationPlayerAction';
import {useDispatch} from 'react-redux';
import {getAllRecitations} from '../../store/actions/recitationsAction/recitationActions';

const ReacitationPlayer = () => {
  const dispatch = useDispatch();

  const [currentTrack, setCurrentTrack] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [lastIndex, setLastIndex] = useState();
  const [playerState, setPlayerState] = useState(State.None);

  const {position, duration} = useProgress();
  const { width, height } = useWindowDimensions();

  // Subscribing to the following events inside MyComponent
  const events = [
    Event.PlaybackState,
    Event.PlaybackError,
    Event.PlaybackTrackChanged,
  ];

  console.log("height:::::", height);

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
    }
  });

  const onRecitationFetched = tracks => {
    setCurrentTrack(tracks[0]);
    setLastIndex(tracks.length - 1);
    TrackPlayer.add(tracks);
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

  const handleSeek = async () => {
    let newPosition = await TrackPlayer.getPosition();
    newPosition += 10;
    if (newPosition > duration) {
      newPosition = duration;
    }
    setSliderValue(newPosition / duration);
    TrackPlayer.seekTo(newPosition);
  };

  const handleNext = async () => {
    TrackPlayer.skipToNext().catch(error => {
      Alert.alert('Error!!', 'Something went wrong');
    });
    const currentTrackIndex = await TrackPlayer.getCurrentTrack();

    if (currentTrackIndex === lastIndex) {
      setCurrentTrack(0);
      return;
    }

    const nextTrack = await TrackPlayer.getTrack(currentTrackIndex + 1);
    setCurrentTrack(nextTrack);
  };
  const handlePrevious = async () => {
    TrackPlayer.skipToPrevious().catch(error => {
      Alert.alert('Error!!', 'Something went wrong');
    });
    const currentTrackIndex = await TrackPlayer.getCurrentTrack();

    if (currentTrackIndex === 0) {
      setCurrentTrack(lastIndex);
      return;
    }

    const previousTrack = await TrackPlayer.getTrack(currentTrackIndex - 1);
    setCurrentTrack(previousTrack);
  };
  const handleThumbsUp = () => {};

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
    setSliderValue(value);
    setIsSeeking(false);
  };

  return (
    <View>
      <RecitationCover />
      <View style={styles.recitationDetail}>
        <Text style={styles.reciterStyle}>{currentTrack?.artist}</Text>
        <Text style={styles.surahNameStyle}>{currentTrack?.title}</Text>
      </View>
      <Slider
        style={styles.sliderStyle}
        value={sliderValue}
        thumbImage={ThumbImage}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor={colors.Black}
        maximumTrackTintColor={colors.HawkesBlue}
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
        onPlay={handlePlay}
        onPause={handlePause}
        onSeek={handleSeek}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onThumbsUp={handleThumbsUp}
        disable={playerState === 'loading' || playerState === 'idle'}
      />
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
    color: colors.Black,
  },
  recitationDetail: {
    height: '12.7%',
  },
});
