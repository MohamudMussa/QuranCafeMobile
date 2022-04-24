import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const FontIcon = ({type = 'fas', icon, size, color}) => {
  return <FontAwesomeIcon icon={[type, icon]} size={size} color={color} />;
};

export default FontIcon;
