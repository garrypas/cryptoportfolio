"use strict";
import axios from 'axios';
import RouteFactory from '../routes/RouteFactory';
import _ from 'lodash';
import Intervals from '../constants/Intervals';

module.exports = (args = {}, dispatch) => {
    console.log(args);
    const intervalIndex = args.intervalIndex || "1Day";
    const intervalObj = Intervals[intervalIndex];
    if(!intervalObj) {
        throw `Interval for key ${interval} was not found`;
    }
    const intervalKey = intervalObj.intervalKey;
    const results = [];
    const promises = args.exchanges.map(exchange => {
        const url = RouteFactory.create(exchange)('TICKS', { 
            baseCurrency: args.baseCurrency,
            quoteCurrency: args.quoteCurrency,
            intervalKey,
        });
        return axios.get(url).then(resp => {
            const actionArgs = {
                data: resp.data,
                range: intervalObj.range,
                exchange,
                intervalIndex
            };
            results.push(actionArgs);
            return actionArgs;
        });
    });
    return Promise.all(promises).then(() => {
        dispatch({
            type: 'Market',
            data: results,
            quoteCurrency: args.quoteCurrency,
            baseCurrency: args.baseCurrency,
        });
    });
}