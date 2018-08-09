"use strict";
import axios from 'axios';
import getRoute from '../routes/getRoute';
import fillHoles from './../utils/FillHoles';
import _ from 'lodash';
import Intervals from '../constants/Intervals';

function getHistoryData(actionArgs, dispatch) {
    const interval = Intervals[actionArgs.interval];
    const route = getRoute('TICKS', actionArgs.market, interval.intervalKey);
    axios.get(route).then(resp => {
        actionArgs.data = fillHoles(resp.data.result, interval.interval);
        actionArgs.range = interval.range;
        dispatch(actionArgs);
        return actionArgs;
    });
}

module.exports = (state = {}, dispatch) => {
    let actionArgs = {
        type: 'Market',
        market: state && state.market,
        interval: state.interval || "1Day"
    };

    getHistoryData(actionArgs, dispatch);

    return actionArgs;
}