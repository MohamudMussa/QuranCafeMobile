import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

const RecitationPlayerButton = ({icon}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={icon} resizeMode="contain" style={styles.iconStyle} />
    </TouchableOpacity>
  );
};

export default RecitationPlayerButton;

const styles = StyleSheet.create({
  container: {
    width: 25,
    height: 25,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
