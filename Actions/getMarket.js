"use strict";
import axios from 'axios';
import RouteFactory from '../routes/RouteFactory';
import _ from 'lodash';
import Intervals from '../constants/Intervals';

module.exports = (args = {}, dispatch) => {
    const interval = Intervals[args.interval || "1Day"];
    const intervalKey = interval.intervalKey;
    const results = [];
    const promises = args.exchanges.map(exchange => {
        const url = RouteFactory.create(exchange)('TICKS', { 
            baseCurrency: args.baseCurrency,
            quoteCurrency: args.quoteCurrency,
            intervalKey,
        });
        console.log(url);
        return axios.get(url).then(resp => {
            const actionArgs = {
                data: resp.data,
                range: interval.range,
                exchange,
                interval: interval.interval,
            };
            results.push(actionArgs);
            return actionArgs;
        });
    })    
    return Promise.all(promises).then(() => {
        dispatch({
            type: 'Market',
            data: results,
            quoteCurrency: args.quoteCurrency,
            baseCurrency: args.baseCurrency,
        });
    });
}