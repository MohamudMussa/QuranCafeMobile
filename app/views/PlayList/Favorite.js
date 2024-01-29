import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../utils/colors';
import RecitationPlayerButton from '../../components/RecitationPlayer/RecitationPlayerButton';
import icons from '../../utils/icons';
import {useDispatch} from 'react-redux';
import {
  getAllRecitations,
  thumbsDownRecitation,
} from '../../store/actions/recitationsAction/recitationActions';
import routes from '../../utils/routes';
import {useNavigation} from '@react-navigation/native';

const Favorite = () => {
  const [likedTracks, setLikedTracks] = useState([]);
  const [totalTracks, setTotalTracks] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onThumbsDown = async currentTrack => {
    thumbsDownRecitation(
      currentTrack?.recitation_id,
      currentTrack.upvote,
      onSuccess,
    );
    setTotalTracks(likedTracks.filter(x => x.isLiked === true));
  };
  const onSuccess = () => {};

  useEffect(() => {
    if (likedTracks) {
      dispatch(getAllRecitations(onRecitationFetched));
      setTotalTracks(likedTracks.filter(x => x.isLiked === true));
    }
  }, [dispatch, likedTracks]);

  const onRecitationFetched = tracks => {
    setLikedTracks(tracks);
  };
  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {totalTracks.length < 1 ? (
          <View>
            <Text style={styles.empty}>
              Click on the hearts Icon to Like Some tracks
            </Text>
          </View>
        ) : (
          totalTracks?.sort(dynamicSort('recitation_id'))?.map(tracks => (
            <TouchableOpacity
              style={styles.playListBanner}
              onPress={() =>
                navigation.navigate(routes.RecitationScreen, {
                  track: tracks,
                  //title: 'Select Country',
                  //list: countries,
                  //labelSelector: 'name',
                  //onSelect: handleSetCountry,
                })
              }
              key={tracks.recitation_id}>
              <View style={styles.trackContainer}>
                <Text style={styles.trackName}>{tracks.title}</Text>
                <Text style={styles.trackTime}> {tracks.artist}</Text>
              </View>

              <RecitationPlayerButton
                icon={icons.HeartIcon}
                onPress={() => onThumbsDown(tracks)}
                disable={false}
                fontType={tracks.isLiked ? 'fas' : 'far'}
                isLiked={tracks.isLiked}
                style={styles.trackLike}
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Black,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  empty: {
    color: colors.GrayShade,
    fontSize: 12,
  },
  scrollView: {
    marginHorizontal: 10,
  },
  playListBanner: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.BlackShade,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  trackContainer: {
    display: 'flex',
    gap: 5,
  },
  trackName: {
    color: colors.White,
    fontSize: 16,
  },
  trackTime: {
    color: colors.White,
    fontSize: 12,
    marginTop: 10,
  },
  trackLike: {
    width: 50,
    height: 50,
    backgroundColor: colors.Ecstasy,
    color: colors.LightOrange,
  },
  playListBtn: {
    fontWeight: 'bold',
    letterSpacing: 1,
    padding: 5,
    color: colors.LightOrange,
  },
});
