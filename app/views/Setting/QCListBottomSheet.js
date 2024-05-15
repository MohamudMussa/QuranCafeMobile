import {
  View,
  Text,
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

import {openComposer} from 'react-native-email-link';
import StackHeader from '../../components/headers/StackHeader/StackHeader';
import LogoWithText from '../../assets/images/logo.png';
import colors from '../../utils/colors';
import OnboardingButton from '../../components/onboarding/OnboardingButton/OnboardingButton';
import PlayerCover from '../../assets/images/mainCover.png';
import fonts from '../../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import StackSearchHeader from '../../components/headers/StackSearchHeader/StackSearchHeader';
export default function QCListBottomSheet({
  showBottomSheet,
  setShowBottomSheet,
  onSelect,
  list,
  title,
}) {
  const refRBSheet = useRef();

  useEffect(() => {
    if (showBottomSheet) {
      refRBSheet.current.open();
    } else {
      refRBSheet.current.close();
    }
  }, [showBottomSheet]);
  const [searchText, setSearchText] = useState('');
  const [listData, setListData] = useState();
  const navigation = useNavigation();
  //   const {list, onSelect} = route.params;

  useEffect(() => {
    setListData(list);
  }, [list]);

  const handleItemSelection = item => {
    onSelect(item);
    refRBSheet.current.close();
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.listItemWrapper}
        onPress={() => handleItemSelection(item)}>
        <Text style={styles.listItemText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const handleSearch = text => {
    const filteredList = list.filter(c => c.includes(text));
    setSearchText(text);
    setListData(filteredList);
  };
  return (
    <RBSheet
      ref={refRBSheet}
      draggable={true}
      closeOnDragDown={true}
      dragOnContent={true}
      dragFromTopOnly={true}
      onClose={v => {
        setShowBottomSheet(false);
      }}
      closeOnPressMask={true}
      // height={600}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        draggableIcon: {
          width: 120,
          height: 7,
          // borderRadius: 3,
          backgroundColor: '#C6AE8A',
          alignSelf: 'center',
          marginTop: 10,
          borderRadius: 14,
        },

        container: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: 700,
          backgroundColor: 'rgba(0,0,0,0.1)',
        },
      }}>
      {/* <ImageBackground
        resizeMode="stretch"
        source={PlayerCover}
        imageStyle={styles.backgroundImageStyle}
        style={styles.container}> */}
      <View
        style={{
          flex: 1,
          backgroundColor: colors.Black,
          paddingTop: 20,
        }}>
        <StackSearchHeader
          placeholder="Search Here..."
          onChange={handleSearch}
          value={searchText}
        />
        <View style={styles.listWrapper}>
          <FlatList
            data={listData}
            renderItem={renderItem}
            removeClippedSubviews={true}
            windowSize={50}
            keyExtractor={item => item}
          />
        </View>
      </View>
      {/* </ImageBackground> */}
    </RBSheet>
  );
}
const styles = StyleSheet.create({
  listWrapper: {
    marginStart: 10,
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  listItemWrapper: {
    height: 50,
    marginTop: 1.5,
    marginBottom: 1.5,
    justifyContent: 'center',
    marginStart: 20,
  },
  listItemText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: fonts.PoppinsRegular,
    color: colors.White,
  },
});
