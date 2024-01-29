import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../utils/colors';

const {width} = Dimensions.get('window');

const PlayListInputModal = ({visible, onClose, onSubmit}) => {
  const [playListName, setPlayListName] = useState('');
  
  const handleSubmit = () => {
    if (!playListName.trim()) {
      onClose();
    } else {
      onSubmit(playListName);
      setPlayListName('');
      onClose();
    }
  };
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Create New Playlist</Text>
          <TextInput
            onChangeText={e => setPlayListName(e)}
            style={styles.input}
            value={playListName}
          />
          <TouchableOpacity 
            style={styles.button}
            onPress={handleSubmit}
            >
              <Text style={styles.inputIcon}>Create</Text>

          </TouchableOpacity>
          
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[StyleSheet.absoluteFillObject, styles.modalBG]} />
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PlayListInputModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBG: {
    backgroundColor: colors.GrayShade,
    zIndex: -1,
  },
  inputContainer: {
    width: width - 20,
    height: 200,
    borderRadius: 10,
    backgroundColor: colors.BlackShade,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.White,
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    width: width - 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.White,
    color: colors.White,
    fontSize: 18,
    paddingVertical: 5,
    marginVertical: 10,
  },
  button: {
    backgroundColor: colors.Ecstasy,
    borderRadius: 15,
    marginTop: 15,
    padding: 10,
  },
  inputIcon: {
    color: colors.White,
    fontWeight: 'bold'
  },
});
