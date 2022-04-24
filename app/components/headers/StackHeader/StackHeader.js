import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../utils/colors';
import fonts from '../../../utils/fonts';
import icons from '../../../utils/icons';
import FontIcon from '../../general/FontIcon/FontIcon';

const StackHeader = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontIcon
          icon={icons.ChevronLeftIcon}
          color={colors.Nutral80}
          size={12}
        />
      </TouchableOpacity>
      <Text style={styles.titleStyle}>{title}</Text>
    </View>
  );
};

export default StackHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    justifyContent: 'space-between',
    paddingStart: 30,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: fonts.PoppinsMedium,
    alignItems: 'center',
  },
});
