"use strict";

import axios from 'axios';
import RouteFactory from '../routes/RouteFactory';
import fillHoles from './../utils/FillHoles';
import _ from 'lodash';

function getTickData(actionArgs, dispatch) {
    const getRoute = RouteFactory.create();
    const route = getRoute[0]('TICK', actionArgs.market);
    const exchange = route.exchange;
    return axios.get(route.url).then(resp => {
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