import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import fonts from '../../utils/fonts';
import colors from '../../utils/colors';

export default function FavoriteCard({item}) {
  console.log('item in fvrt card====', item);
  const handleRemoveFav = recID => {
    console.log('rec ID======', recID);
  };
  return (
    <View style={styles.actionSection}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
      <TouchableOpacity onPress={handleRemoveFav(item.recitation_id)}>
        <Image
          source={require('../../assets/images/heart-bbar-icon.png')}
          style={{width: 20, height: 20}}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
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
