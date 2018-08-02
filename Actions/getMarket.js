"use strict";
import axios from 'axios';

module.exports = (args, dispatch) => {
    var actionArgs = {
        type: 'GET_MARKET',
        market: args && args.market
    };

    return axios.get(`https://bittrex.com/Api/v2.0/pub/market/GetTicks?marketName=${args.market}&tickInterval=thirtyMin`).then(resp => {
        actionArgs.data = resp.data.result;
        dispatch(actionArgs);
    });
}