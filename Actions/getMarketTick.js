"use strict";

import axios from 'axios';
import RouteFactory from '../routes/RouteFactory';

module.exports = (args = {}, dispatch) => {
    const results = [];
    const promises = args.exchanges.map(exchangeItem => {
        const route = RouteFactory.create(exchangeItem.exchange)('TICK', {
            baseCurrency: exchangeItem.baseCurrency,
            quoteCurrency: exchangeItem.quoteCurrency,
        });
        return axios.get(route).then(resp => {
            results.push({
                exchange: exchangeItem.exchange,
                baseCurrency: exchangeItem.baseCurrency,
                quoteCurrency: exchangeItem.quoteCurrency,
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