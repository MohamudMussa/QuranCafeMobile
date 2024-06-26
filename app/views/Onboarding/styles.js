import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.Black,
  },
  pageViewStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  titleStyle: {
    fontSize: 22,
    fontFamily: fonts.ConsolasBold,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    color: '#FFFFFF',
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
