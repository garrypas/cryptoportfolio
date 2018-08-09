"use strict";

import _ from 'lodash';
import AsyncStorageArrayWrapper from '../utils/AsyncStorageArrayWrapper';

export default function (args = {}, dispatch) {
    const market = args.market;

    const actionArgs = { 
        type: 'AddToMyCurrencies',
        market,
    };

    return AsyncStorageArrayWrapper.getItem('myCurrencies').then(myCurrencies => {
        if(!(myCurrencies instanceof Array)) {
            myCurrencies = new Array();
        }
        if(!myCurrencies.includes(market)) {
            myCurrencies.push(market);
        }
        myCurrencies = myCurrencies.filter(m => m);
        return AsyncStorageArrayWrapper.setItem('myCurrencies', myCurrencies).then(() => myCurrencies);
    }).then(myCurrencies => {
        actionArgs.myCurrencies = myCurrencies;
        dispatch(actionArgs);
    }).catch(console.error);
};