import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {navIcons} from '../../utils/icons';
import colors from '../../utils/colors';

const NavBarIcon = ({focused, icon, size}) => {
  const RenderIcon = navIcons[icon];

  return (
    <RenderIcon
      size={22}
      set={focused ? 'bold' : 'light'}
      primaryColor={focused ? colors.Ecstasy : colors.Nutral80}
    />
  );
};

NavBarIcon.propTypes = {
  size: PropTypes.number,
  focused: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
};

NavBarIcon.defaultProps = {
  size: 32,
};

export default NavBarIcon;

const styles = StyleSheet.create({
  imageStyle: {
    width: 30,
    height: 30,
  },
});
