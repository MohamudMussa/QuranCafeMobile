import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import StackHeader from '../../components/headers/StackHeader/StackHeader';
import SettingsButton from '../../components/SettingsButton/SettingsButton';
import colors from '../../utils/colors';
import routes from '../../utils/routes';
import {supabaseClient} from '../../superbase/init';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCurrentTrackCover} from '../../store/actions/recitationsAction/recitationActions';
import {useDispatch} from 'react-redux';
import FavoriteCard from './FavoriteCard';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import PlayerCover from '../../assets/images/mainCover.png';
import fonts from '../../utils/fonts';

const Favorite = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [favoriteRecitations, setFavoriteRecitations] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchAllRecitations = async () => {
    setLoading(true);
    const {data, error} = await supabaseClient.from('recitations').select('*');
    const likedRecitationsInStorage = await AsyncStorage.getItem(
      'likedRecitations',
    );

    if (likedRecitationsInStorage) {
      console.log('likedRecitationsInStorage=====', likedRecitationsInStorage);
      const likedRecitationsIds = JSON.parse(likedRecitationsInStorage);

      console.log('likedRecitationsIds======', likedRecitationsIds);
      const likedRecitations = data.filter(recitation =>
        likedRecitationsIds.includes(recitation.recitation_id),
      );

      const recitationsWithCoverPhotos = await Promise.all(
        likedRecitationsIds.map(async recitation => {
          const coverPhotoURL = await dispatch(
            getCurrentTrackCover(recitation.cover_photo_id),
          );
          return {...recitation, coverPhoto: coverPhotoURL};
        }),
      );
      console.log(
        'recitationsWithCoverPhotos=======',
        recitationsWithCoverPhotos,
      );
      setFavoriteRecitations(recitationsWithCoverPhotos);
      setLoading(false);
    }
    setLoading(false);

    if (error) {
      console.error('Error fetching recitations:', error.message);
      setLoading(false);
      return [];
    }
  };
  useEffect(() => {
    fetchAllRecitations();
  }, [isFocused]);
  const handleRemoveFav = async recID => {
    console.log('rec ID======', recID);
    try {
      // Remove the recitation ID from AsyncStorage
      const likedRecitationsInStorage = await AsyncStorage.getItem(
        'likedRecitations',
      );
      console.log(
        'likedRecitations in rem func====',
        likedRecitationsInStorage,
      );
      if (likedRecitationsInStorage) {
        let likedRecitations = JSON.parse(likedRecitationsInStorage);

        // Filter out the recitation to be removed
        likedRecitations = likedRecitations.filter(
          recitation => recitation.recitation_id !== recID,
        );
        setFavoriteRecitations(prevRecitations =>
          prevRecitations.filter(
            recitation => recitation.recitation_id !== recID,
          ),
        );
        console.log(
          'likedRecitations to set in local========',
          likedRecitations,
        );
        // Update the liked recitations in AsyncStorage
        await AsyncStorage.setItem(
          'likedRecitations',
          JSON.stringify(likedRecitations),
        );

        // Fetch updated list of favorite recitations
        await fetchAllRecitations();
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };
  return (
    <ImageBackground
      resizeMode="stretch"
      source={PlayerCover}
      imageStyle={styles.backgroundImageStyle}
      style={styles.container}>
      {loading ? (
        <ActivityIndicator
          color={'#FFFFF'}
          size={'large'}
          style={{marginTop: 40}}
        />
      ) : (
        <View style={{flex: 1, marginTop: 30}}>
          <FlatList
            data={favoriteRecitations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={
              ({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(routes.RecitationScreen, {
                        favoriteSurah: item,
                      })
                    }>
                    <View style={styles.actionSection}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.imageContainer}>
                          <Image
                            style={styles.img}
                            source={{uri: item?.coverPhoto}}
                            resizeMode="cover"
                          />
                        </View>
                        <View>
                          <Text style={styles.txt}>{item?.title}</Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => handleRemoveFav(item.recitation_id)}>
                        <Image
                          source={require('../../assets/images/heart-bbar-icon.png')}
                          style={{
                            width: 20,
                            height: 20,
                            tintColor: colors.White,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              }
              //   (
              //   <TouchableOpacity
              //     onPress={() =>
              //       navigation.navigate(routes.RecitationScreen, {
              //         favoriteSurah: item,
              //       })
              //     }>
              //     <FavoriteCard item={item} />
              //   </TouchableOpacity>
              // )
            }
            ListEmptyComponent={() => {
              return (
                <Text
                  style={{
                    color: '#FFFFF',
                    fontFamily: fonts.CourierPrimeRegular,
                    textAlign: 'center',
                    marginTop: 50,
                  }}>
                  No Favorites
                </Text>
              );
            }}
          />
        </View>
      )}
      {/* </View> */}
      {/* </SafeAreaView> */}
    </ImageBackground>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Black,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.Black,
  },
  textStyle: {
    fontSize: 20,
    lineHeight: 18,
    fontWeight: '400',
    fontFamily: fonts.CourierPrimeRegular,
    color: colors.Black,
    textAlign: 'center',
    marginTop: 60,
    // marginStart: 30,
  },
  headerStyle: {
    width: '90%',
    height: 90,
    // marginTop: 50,
    backgroundColor: '#C6AE8A',
    alignSelf: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  backgroundImageStyle: {
    width: '100%',
    height: '100%',
  },
  actionSection: {
    marginTop: 28,
    borderWidth: 1,
    borderColor: '#A1A1A1',
    height: 80,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
  },
  footer: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.Black,
    marginTop: 1,
  },
  logoStyle: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
    width: 80,
    height: 80,
  },
  actionSection: {
    marginTop: 28,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: '#C6AE8A',
    height: 80,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C6AE8A',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8.84,
    elevation: 5,
    justifyContent: 'space-between',
  },
  imageContainer: {
    marginHorizontal: 20,
    borderRadius: 8,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {width: '100%', height: '100%', borderRadius: 8},
  txt: {
    fontSize: 22,
    // lineHeight: 18,
    fontWeight: '500',
    fontFamily: fonts.CourierPrimeRegular,
    color: '#FFFFFF',
  },
});
