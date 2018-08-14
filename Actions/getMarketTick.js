"use strict";

import axios from 'axios';
import RouteFactory from '../routes/RouteFactory';

module.exports = (args = {}, dispatch) => {
    const results = [];
    const promises = args.exchanges.map(exchange => {
        const route = RouteFactory.create(exchange)('TICK', {
            baseCurrency: args.baseCurrency,
            quoteCurrency: args.quoteCurrency,
        });
        return axios.get(route).then(resp => {
            results.push({
                exchange,
                data: resp.data,
                type: 'MarketTick'
            });
        });
    });

    return Promise.all(promises).then(() => {
        dispatch({
            data: results,
            type: 'MarketTick'
        });
    })
};