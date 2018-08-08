"use strict";

import AsyncStorageArrayWrapper from '../utils/AsyncStorageArrayWrapper';

const functionInterface = (state = {}, dispatch) => functionInterface._getMyCurrencies(state, dispatch);

functionInterface._getMyCurrencies = (state = {}, dispatch) => {
    const myCurrencies = AsyncStorageArrayWrapper.getItem('myCurrencies').then(val => {
        dispatch({
            type: 'GET_MY_CURRENCIES',
            myCurrencies: val,
        });
    });
};

export default functionInterface;