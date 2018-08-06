"use strict";
import axios from 'axios';
import getRoute from '../routes/getRoute';
import fillHoles from './../utils/FillHoles';
import _ from 'lodash';

function getHistoryData(actionArgs, dispatch) {
    console.log('getting full history, interval = ' + actionArgs.interval);
    const route = getRoute('TICKS', actionArgs.market, actionArgs.interval);
    axios.get(route).then(resp => {
        actionArgs.data = fillHoles(resp.data.result, 30);
        dispatch(actionArgs);
        return actionArgs;
    });
}

module.exports = (state = {}, dispatch) => {
    console.log(state);
    let actionArgs = {
        type: 'GET_MARKET',
        market: state && state.market,
        interval: state.interval
    };

    getHistoryData(actionArgs, dispatch);

    return actionArgs;
}