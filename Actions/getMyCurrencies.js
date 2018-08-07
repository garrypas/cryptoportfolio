"use strict";
import { AsyncStorage } from 'react-native';

module.exports = (state = {}, dispatch) => {
    const myCurrencies = AsyncStorage.getItem('myCurrencies').then(val => {
        dispatch({
            type: 'GET_MY_CURRENCIES',
            myCurrencies: val || [],
        });
    });
};