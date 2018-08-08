import { AsyncStorage } from 'react-native';

module.exports = {
    getItem : (key, callback) => {
        return AsyncStorage.getItem(key, callback).then(val => {
            const json = JSON.parse(val);
            return json && json.array;
        })
    },
    setItem : (key, value, callback) => {
        const str = JSON.stringify({
            array: value
        })
        return AsyncStorage.setItem(key, str, callback);
    }
}