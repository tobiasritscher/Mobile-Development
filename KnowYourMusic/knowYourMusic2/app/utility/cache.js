import AsyncStorage from '@react-native-async-storage/async-storage';

const store = async (key, value) => {
    try {
        //stores data in cache as key value pair
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        console.log(error);
    }
}

const get = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log(error);
    }
}

export default {
    store,
    get,
};
