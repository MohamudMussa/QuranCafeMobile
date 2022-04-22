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
    marginTop: 32,
    alignItems: 'center',
    backgroundColor: colors.white,
    shadowColor: colors.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 5,
    height: '49.5%',
  },
  recitationCover: {
    width: '88%',
    height: '100%',
    borderRadius: 19,
  },
});
