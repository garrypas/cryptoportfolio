"use strict";
import AsyncStorageArrayWrapper from '../utils/AsyncStorageArrayWrapper';

module.exports = (state = {}, dispatch) => {
    const myCurrencies = AsyncStorageArrayWrapper.getItem('myCurrencies').then(val => {
        dispatch({
            type: 'GET_MY_CURRENCIES',
            myCurrencies: val || [],
        });
    });
};