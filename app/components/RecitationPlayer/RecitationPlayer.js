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
import {useIsFocused} from '@react-navigation/native';

const ReacitationPlayer = ({favoriteSurah}) => {
  const dispatch = useDispatch();
  // console.log('favorit surah in Player====', favoriteSurah);

  const [currentTrack, setCurrentTrack] = useState();
  const [prevTrackIndex, setPrevTrackIndex] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [lastIndex, setLastIndex] = useState();
  const [currentTrackIndex, setCurrentTrackIndex] = useState();
  const [playerState, setPlayerState] = useState(State.None);
  const [loop, setLoop] = useState(false);
  const [currentTrackCover, setCurrentTrackCover] = useState();

  const {position, duration} = useProgress();
  const isFocused = useIsFocused();
  // Subscribing to the events
  const events = [
    Event.PlaybackState,
    Event.PlaybackError,
    Event.PlaybackTrackChanged,
  ];

  useEffect(() => {
    if (favoriteSurah) {
      TrackPlayer.destroy();
    }
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
  }, [favoriteSurah]);

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
    // console.log('fetched track=====', tracks);

    if (favoriteSurah) {
      const favoriteTrack = tracks.find(
        track =>
          track.recitation_id === favoriteSurah.favoriteSurah.recitation_id &&
          // track.title === favoriteSurah.favoriteSurah.title &&
          track.url === favoriteSurah.favoriteSurah.mp3,
      );
      favoriteTrack.isLiked = true;
      setCurrentTrack(favoriteTrack);
      console.log(' fav surah exists===', favoriteTrack);
      TrackPlayer.add([favoriteTrack, ...tracks]).then(() => {
        TrackPlayer.setRepeatMode(RepeatMode.Off);
      });
      setLastIndex(tracks.length - 1);
      setCurrentTrackIndex(0);
    } else {
      setCurrentTrack(tracks[0]);
      console.log('no fav surah');
      TrackPlayer.add(tracks).then(() => {
        TrackPlayer.setRepeatMode(RepeatMode.Off);
      });
      setLastIndex(tracks.length - 1);
      setCurrentTrackIndex(0);
    }
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
    TrackPlayer.skip(prevTrackIndex);
    setCurrentTrackCover(dispatch(getCurrentTrackCover()));
    setCurrentTrackIndex(prevTrackIndex);
    const prevTrack = await TrackPlayer.getTrack(prevTrackIndex);
    console.log('prevTrack====', prevTrack);
    setCurrentTrack(prevTrack);
  };
  const handleThumbsUp = () => {
    thumbsUpRecitation(currentTrack, onSuccess);
  };

  const onSuccess = async () => {
    TrackPlayer.updateMetadataForTrack(currentTrackIndex, {
      ...currentTrack,
      isLiked: true,
    }).then(async () => {
      const track = await TrackPlayer.getTrack(currentTrackIndex);
      console.log('track====', track);

      setCurrentTrack(track);
    });
  };

  // const getAudioTimeString = seconds => {
  //   const h = parseInt(seconds / (60 * 60), 10);
  //   const m = parseInt((seconds % (60 * 60)) / 60, 10);
  //   const s = parseInt(seconds % 60, 10);

  //   return (
  //     (h < 10 ? '0' + h : h) +
  //     ':' +
  //     (m < 10 ? '0' + m : m) +
  //     ':' +
  //     (s < 10 ? '0' + s : s)
  //   );
  // };
  // console.log('Current playing track=======', currentTrack);
  const getAudioTimeString = seconds => {
    const m = parseInt((seconds % (60 * 60)) / 60, 10);
    const s = parseInt(seconds % 60, 10);

    return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
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
      TrackPlayer.skip(shuffledIndex);
      setCurrentTrackCover(dispatch(getCurrentTrackCover()));
      setPrevTrackIndex(currentTrackIndex);
      setCurrentTrackIndex(shuffledIndex);
      const shuffledTrack = await TrackPlayer.getTrack(shuffledIndex);
      console.log('shuffledTrack====', shuffledTrack);
      setCurrentTrack(shuffledTrack);
    } catch (err) {
      Alert.alert('Error!!', 'Something went wrong');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: 'red',
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      {/* <RecitationCover cover={currentTrackCover} /> */}
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
        hasPrevTrack={!!prevTrackIndex}
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
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '400',
    fontFamily: fonts.CourierPrimeRegular,

    color: '#FFFFFF',

    marginTop: 0,
    textAlign: 'center',
  },
  surahNameStyle: {
    fontSize: 35,
    fontWeight: '400',
    fontFamily: fonts.CourierPrimeRegular,

    color: '#FFFFFF',

    // lineHeight: 25,
    textAlign: 'center',
    // marginTop: 0,
  },
  sliderStyle: {
    width: '90%',
    height: 2,
    alignSelf: 'center',
    marginTop: 300,
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
    color: '#FFFFFF',
  },
  recitationDetail: {
    height: '12.7%',
    marginTop: 30,
  },
});
