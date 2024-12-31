import AsyncStorage from '@react-native-async-storage/async-storage';

if (typeof window !== 'undefined') {
    window.localStorage = AsyncStorage;
}

export default AsyncStorage; 