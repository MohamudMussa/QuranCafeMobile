import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../utils/colors';
import FontIcon from '../general/FontIcon/FontIcon';

const RecitationPlayerButton = ({
  icon,
  onPress,
  disable,
  fontType,
  isOnLoop,
  isLiked,
  iconStyle,
}) => {
  const getColor = () => {
    if (disable) {
      return colors.LightGrey;
    }
    if (isOnLoop || isLiked) {
      return colors.Black;
    }
    return colors.White;
  };
  return (
    <TouchableOpacity onPress={onPress} disabled={disable}>
      <Image source={icon} style={[iconStyle]} />
    </TouchableOpacity>
  );
};

RecitationPlayerButton.defaultProps = {
  fontType: 'fas',
};

export default RecitationPlayerButton;

const styles = StyleSheet.create({
  container: disabled => ({
    width: 25,
    height: 25,
  }),
  iconStyle: {
    width: 20,
    height: 20,
  },
});
