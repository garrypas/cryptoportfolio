"use strict";

import getRoute from '../routes/getRoute';
import axios from 'axios';
// import getMyCurrencies from './getMyCurrencies';

module.exports = (args = {}, dispatch) => {
    let actionArgs = {
        type: 'Markets'
    };

    const route = getRoute('SUMMARY');
    const previousMarkets = args.previous && args.previous.slice();
    return axios.get(route).then(resp => {
        actionArgs.data = resp.data.result;
        actionArgs.previous = previousMarkets;
        dispatch(actionArgs);
        return actionArgs;
    });
}