"use strict";

import axios from 'axios';
import getRoute from '../routes/getRoute';
import fillHoles from './../utils/FillHoles';
import _ from 'lodash';

function getTickData(actionArgs, dispatch) {
    const route = getRoute('TICK', actionArgs.market);
    axios.get(route).then(resp => {
        const last = resp.data.result.Last;
        actionArgs.data = { last };
        dispatch(actionArgs);
        return actionArgs;
    });
}

module.exports = (state = {}, dispatch) => {
    let actionArgs = {
        type: 'MarketTick',
        market: state && state.market
    };

    return getTickData(actionArgs, dispatch);
}