import React, {useRef, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import StackHeader from '../../components/headers/StackHeader/StackHeader';
import SettingsButton from '../../components/SettingsButton/SettingsButton';
import colors from '../../utils/colors';
import routes from '../../utils/routes';
import PlayerCover from '../../assets/images/mainCover.png';
import fonts from '../../utils/fonts';
import LocationIcon from '../../assets/images/location.png';
import MailIcon from '../../assets/images/mail.png';
import CafeIcon from '../../assets/images/cafe.png';
import RBSheet from 'react-native-raw-bottom-sheet';
import AppBottomSheet from './AppBottomSheet';
import LocationBottomSheet from './LocationBottomSheet';

const Setting = ({navigation}) => {
  const [showAboutSheet, setShowAboutSheet] = useState(false);
  const [showLocationSheet, setShowLocationSheet] = useState(false);

  const refRBSheet = useRef();

  const handleSharing = () => {
    Share.share({
      message: 'https://quran.cafe/',
    });
  };

  return (
    // <SafeAreaView style={styles.container}>
    <ImageBackground
      resizeMode="stretch"
      source={PlayerCover}
      imageStyle={styles.backgroundImageStyle}
      style={styles.container}>
      {/* <View style={styles.contentContainer}> */}
      {/* <View style={styles.headerStyle}>
          <StackHeader title="Settings" />
        </View> */}
      {/* <View style={styles.headerStyle}>
        <Text style={styles.textStyle}>Settings</Text>
      </View> */}
      <View style={styles.actionSection}>
        <SettingsButton
          text="Location"
          onPress={() => {
            // navigation.navigate(routes.LocationSettingsScreen)
            setShowLocationSheet(true);
          }}
          icon={LocationIcon}
          iconStyle={{width: 20, height: 20}}
        />
        <SettingsButton
          icon={MailIcon}
          iconStyle={{width: 20, height: 20}}
          text="Share Recitation"
          onPress={handleSharing}
        />
        <SettingsButton
          icon={CafeIcon}
          iconStyle={{width: 20, height: 20}}
          text="About Quran Cafe"
          onPress={() => {
            // navigation.navigate(routes.AboutScreen)
            setShowAboutSheet(true);
          }}
        />
      </View>
      {showAboutSheet && (
        <AppBottomSheet
          setShowBottomSheet={setShowAboutSheet}
          showBottomSheet={showAboutSheet}
        />
      )}
      {showLocationSheet && (
        <LocationBottomSheet
          setShowBottomSheet={setShowLocationSheet}
          showBottomSheet={showLocationSheet}
        />
      )}
      {/* </View> */}
    </ImageBackground>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Black,
  },
  backgroundImageStyle: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.Black,
  },
  headerStyle: {
    width: '90%',
    height: 90,
    // marginTop: 50,
    backgroundColor: '#C6AE8A',
    alignSelf: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  actionSection: {
    marginTop: 170,
  },
  footer: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.Black,
    marginTop: 1,
  },
  logoStyle: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
    width: 80,
    height: 80,
  },
  textStyle: {
    fontSize: 20,
    lineHeight: 18,
    fontWeight: '500',
    fontFamily: fonts.CourierPrimeRegular,
    color: colors.Black,
    textAlign: 'center',
    marginTop: 60,
    // marginStart: 30,
  },
});
