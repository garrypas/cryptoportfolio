"use strict";
import axios from 'axios';
import getRoute from '../routes/getRoute';
import fillHoles from './../utils/FillHoles';

module.exports = (args = {}, dispatch) => {
    let actionArgs = {
        type: 'GET_MARKET',
        market: args && args.market
    };

    const route = getRoute('TICKS', args.market, 'thirtyMin');
    axios.get(route).then(resp => {
        actionArgs.data = fillHoles(resp.data.result, 30);
        dispatch(actionArgs);
        return actionArgs;
    });

    return actionArgs;
}