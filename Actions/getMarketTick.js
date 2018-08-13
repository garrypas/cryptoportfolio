"use strict";

import axios from 'axios';
import RouteFactory from '../routes/RouteFactory';
import fillHoles from './../utils/FillHoles';
import _ from 'lodash';

function getTickData(actionArgs, dispatch) {
    const exchange = 'Bittrex';
    const route = RouteFactory.create(exchange)('TICK', { 
        baseCurrency: actionArgs.baseCurrency,
        quoteCurrency: actionArgs.quoteCurrency,
    });
    return axios.get(route).then(resp => {
        const last = resp.data.result.Last;
        actionArgs.data = { last, exchange };
        dispatch(actionArgs);
        return actionArgs;
    });
}

module.exports = (state = {}, dispatch) => {
    let actionArgs = {
        type: 'MarketTick',
        market: state && state.market,
    };

    return getTickData(actionArgs, dispatch);
}