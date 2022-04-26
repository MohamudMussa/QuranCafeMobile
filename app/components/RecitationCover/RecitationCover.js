import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import BlurredImage from '../../assets/images/image_blur.png';
import colors from '../../utils/colors';

const RecitationCover = ({cover}) => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        defaultSource={BlurredImage}
        source={{uri: cover}}
        style={styles.recitationCover}
      />
    </View>
  );
};

export default RecitationCover;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: colors.white,
    shadowColor: colors.Black,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8.84,
    elevation: 5,
    height: '49.5%',
  },
  recitationCover: {
    width: '75%',
    height: '90%',
    borderRadius: 19,
  },
});
