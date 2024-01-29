import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../utils/colors';
import PlayListInputModal from '../../components/PlayList/PlayListInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {addPlaylist} from '../../store/actions/playListAction/playListAction';
import {useNavigation} from '@react-navigation/native';
import routes from '../../utils/routes';
import {getAllRecitations} from '../../store/actions/recitationsAction/recitationActions';

const Playlist = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const createPlayList = async playListName => {
    const result = await AsyncStorage.getItem('playlist');
    if (result !== null) {
      const newList = {
        id: Date.now(),
        title: playListName,
        // audios
      };
      dispatch(addPlaylist(newList));
    }
  };
  const [likedTracks, setLikedTracks] = useState([]);
  useEffect(() => {
    if (likedTracks) {
      dispatch(getAllRecitations(onRecitationFetched));
    }
    setTotal(likedTracks.filter(x => x.isLiked === true));
  }, [dispatch, likedTracks]);

  const onRecitationFetched = tracks => {
    setLikedTracks(tracks);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.playListBanner}
        onPress={() => navigation.navigate(routes.FavoriteScreen)}>
        <Text style={{color: colors.White}}>My Favorite</Text>
        <Text style={styles.audioCount}>{total.length} Tracks</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{marginTop: 15}}>
        <Text style={styles.playListBtn}>+ Add PlayList</Text>
      </TouchableOpacity>
      <PlayListInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={createPlayList}
      />
    </ScrollView>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Black,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  playListBanner: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: colors.BlackShade,
  },
  audioCount: {
    color: colors.White,
    marginTop: 5,
    opacity: 0.5,
    fontSize: 14,
  },
  playListBtn: {
    fontWeight: 'bold',
    letterSpacing: 1,
    padding: 5,
    color: colors.LightOrange,
  },
  backgroundImageStyle: {
    width: '100%',
    height: 812,
  },
});
