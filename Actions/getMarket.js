"use strict";
import axios from 'axios';
import getRoute from '../routes/getRoute';

module.exports = (args, dispatch) => {
    let actionArgs = {
        type: 'GET_MARKET',
        market: args && args.market
    };

    const route = getRoute('TICKS', args.market, 'thirtyMin');

    axios.get(route).then(resp => {
        actionArgs.data = resp.data.result;
        dispatch(actionArgs);
        return actionArgs;
    });

    return actionArgs;
}