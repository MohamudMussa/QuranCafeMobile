import React from 'react';
import {Image, SafeAreaView, Share, StyleSheet, View} from 'react-native';
import StackHeader from '../../components/headers/StackHeader/StackHeader';
import SettingsButton from '../../components/SettingsButton/SettingsButton';
import colors from '../../utils/colors';
import LogoWithText from '../../assets/images/logo-with-text.png';
import routes from '../../utils/routes';

const Setting = ({navigation}) => {

  const handleSharing = () => {
    Share.share({
      message: 'https://quran.cafe/',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerStyle}>
          <StackHeader title="Settings" />
        </View>
        <View style={styles.actionSection}>
          <SettingsButton
            text="Location"
            onPress={() => navigation.navigate(routes.LocationSettingsScreen)}
          />
          <SettingsButton text="Share Recitation" onPress={handleSharing} />
        </View>

        <View style={styles.actionSection}>
          <SettingsButton
            text="About Quran Cafe"
            onPress={() => navigation.navigate(routes.AboutScreen)}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Image
          source={LogoWithText}
          resizeMode="contain"
          style={styles.logoStyle}
        />
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.Nutral5,
  },
  headerStyle: {
    height: 60,
    paddingTop: 10,
    backgroundColor: colors.White,
  },
  actionSection: {
    marginTop: 28,
  },
  footer: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.White,
    marginTop: 1,
  },
  logoStyle: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
    width: 80,
    height: 80,
  },
});
