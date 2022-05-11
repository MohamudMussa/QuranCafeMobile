import React from 'react';
import {SafeAreaView, Share, StyleSheet, View} from 'react-native';
import StackHeader from '../../components/headers/StackHeader/StackHeader';
import SettingsButton from '../../components/SettingsButton/SettingsButton';
import colors from '../../utils/colors';
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
          <SettingsButton
            text="About Quran Cafe"
            onPress={() => navigation.navigate(routes.AboutScreen)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Black,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.Black,
  },
  headerStyle: {
    height: 60,
    paddingTop: 10,
    backgroundColor: colors.Black,
  },
  actionSection: {
    marginTop: 28,
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
});
