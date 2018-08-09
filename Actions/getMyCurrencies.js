"use strict";

import AsyncStorageArrayWrapper from '../utils/AsyncStorageArrayWrapper';

export default (state = {}, dispatch) => {
    return AsyncStorageArrayWrapper.getItem('myCurrencies').then(val => {
        dispatch({
            type: 'MyCurrencies',
            myCurrencies: val,
        });
    });
};