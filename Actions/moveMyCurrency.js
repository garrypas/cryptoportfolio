"use strict";

import AsyncStorageArrayWrapper from '../utils/AsyncStorageArrayWrapper';

export default function (state = {}, dispatch) {
    const myCurrencies = state.myCurrencies.map(c => c.key);
    myCurrencies.splice(state.to, 0, myCurrencies.splice(state.from, 1)[0]);

    const actionArgs = { 
        type: 'MoveMyCurrency',
        myCurrencies
    };

    return AsyncStorageArrayWrapper.setItem('myCurrencies', myCurrencies).then(myCurrencies => {
        dispatch(actionArgs);
    }).catch(console.error);
};