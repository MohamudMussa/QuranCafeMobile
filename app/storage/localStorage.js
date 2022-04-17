import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveValue = (key, value) => {
  const storeData = async () => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('failed to set item with key: ', key, ' and value ', value);
    }
  };
  storeData();
};

export const removeItem = key => {
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('failed to remove key: ', key);
    }
  };
  removeValue();
};
