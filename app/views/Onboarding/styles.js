import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.White,
  },
  pageViewStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  titleStyle: {
    fontSize: 29,
    fontFamily: fonts.PoppinsBold,
    fontWeight: '700',
    marginTop: 60,
    textAlign: 'center',
    color: colors.White,
  },
  imageStyle: {
    width: '90%',
    alignSelf: 'center',
  },
  innerContent: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'space-between',
  },
});

export default styles;
