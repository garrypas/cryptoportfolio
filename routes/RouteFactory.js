"use strict";

import BittrexRoutes from './exchanges/BittrexRoutes';
import BinanceRoutes from './exchanges/BinanceRoutes';

const stringFormat = require('string-format');

function getUrlTemplate(key, routes) {
    const route = routes[key];
    if(!route) {
        throw `Route matching key ${key} not found`;
    }
    return route;
}

function createRouteDelegate(routes) {
    return function(...args) {
        const _args = args.slice();
        const routeKey = _args[0];
        let urlTemplate = getUrlTemplate(routeKey, routes);
        _args[0] = urlTemplate;
        return stringFormat( ..._args );
    };
};

module.exports = {
    create: () => {
        return [
            // BinanceRoutes,
            createRouteDelegate(BittrexRoutes),
        ]
    }
}