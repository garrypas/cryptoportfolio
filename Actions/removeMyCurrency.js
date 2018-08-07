"use strict";

import _ from 'lodash';
import AsyncStorageArrayWrapper from '../utils/AsyncStorageArrayWrapper';

export default function (args = {}, dispatch) {
    const market = args.market;

    const actionArgs = { 
        type: 'REMOVE_MY_CURRENCY',
        market,
    };

    AsyncStorageArrayWrapper.getItem('myCurrencies').then(myCurrencies => {
        if(!(myCurrencies instanceof Array)) {
            myCurrencies = new Array();
        }
        if(myCurrencies.includes(market)) {
            _.remove(myCurrencies, item => item === market);
        }
        myCurrencies = myCurrencies.filter(m => m);
        return AsyncStorageArrayWrapper.setItem('myCurrencies', myCurrencies).then(() => myCurrencies);
    }).then(myCurrencies => {
        actionArgs.myCurrencies = myCurrencies;
        dispatch(actionArgs);
    }).catch(console.error);

    return actionArgs;
};