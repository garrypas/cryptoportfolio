"use strict";

import RouteFactory from '../routes/RouteFactory';
import axios from 'axios';

module.exports = (args = {}, dispatch) => {
    const routeCreators = RouteFactory.create();
    const promises = [];
    const results = [];
    routeCreators.forEach(routeCreator => {
        const route = routeCreator('SUMMARY');
        const previousMarkets = args.previous && args.previous.slice();
        const exchange = route.exchange;
        promises.push(
            axios.get(route.url).then(resp => {
                let actionArgs = {
                    type: 'Markets',
                    exchange
                };
                actionArgs.data = resp.data.result;
                actionArgs.previous = previousMarkets;
                results.push(actionArgs);
                return actionArgs;
            })
        );
    });
    return Promise.all(promises).then(() => {
        dispatch(results);
    });
}