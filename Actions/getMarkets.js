"use strict";

import RouteFactory from '../routes/RouteFactory';
import axios from 'axios';

module.exports = (args = {}, dispatch) => {
    const promises = [];
    const results = [];
    [ "Bittrex", "Binance" ].forEach(exchange => {
        const route = RouteFactory.create(exchange)('SUMMARY');
        promises.push(
            axios.get(route).then(resp => {
                let actionArgs = {
                    type: 'Markets',
                    exchange
                };
                actionArgs.data = resp.data;
                results.push(actionArgs);
                return actionArgs;
            })
        );
    });
    return Promise.all(promises).then(() => {
        dispatch(results);
    }).catch(console.error);
}