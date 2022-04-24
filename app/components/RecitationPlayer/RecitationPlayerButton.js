import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../utils/colors';
import FontIcon from '../general/FontIcon/FontIcon';

const RecitationPlayerButton = ({
  icon,
  onPress,
  disable,
  fontType,
  isOnLoop,
}) => {
  return (
    <TouchableOpacity
      style={styles.container(disable)}
      onPress={onPress}
      disable={disable}>
      <FontIcon
        icon={icon}
        size={22}
        color={isOnLoop ? colors.Black : colors.White}
        type={fontType}
      />
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
