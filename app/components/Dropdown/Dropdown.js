import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../../utils/colors';

const Dropdown = ({
  value,
  items,
  setValue,
  placeholder,
  onChangeValue,
  zIndex,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={onChangeValue}
      placeholder={placeholder}
      style={styles.dropdownPickerStyle}
      containerStyle={styles.containerStyle}
      dropDownContainerStyle={styles.dropDownContainerStyle}
      zIndex={zIndex}
      {...props}
    />
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 99,
  },
  dropdownPickerStyle: {
    height: 53,
    backgroundColor: colors.Nutral5,
    borderRadius: 8,
    borderWidth: 0,
  },
  containerStyle: {
    width: '90%',
    alignSelf: 'center',
  },
  dropDownContainerStyle: {
    borderColor: colors.Nutral5,
  },
});
