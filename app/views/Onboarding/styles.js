import {StyleSheet} from 'react-native';
import fonts from '../../utils/fonts';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'space-between',
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
    marginTop: 5,
    textAlign: 'center',
  },
  imageStyle: {
    width: '90%',
    marginTop: 20,
    alignSelf: 'center',
  },
  innerContent: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'space-between',
  },
});

export default styles;
