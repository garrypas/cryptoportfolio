"use strict";

import IntervalKeys from '../constants/IntervalKeys';

const exchangeRouteTemplates = {
    Bittrex: require('./exchanges/BittrexRoutes'),
    Binance: require('./exchanges/BinanceRoutes'),
};

const stringFormat = require('string-format');

function getUrlTemplate(key, routes) {
    const route = routes[key];
    if(!route) {
        throw `Route matching key ${key} not found`;
    }
    return route;
}

function createRouteDelegate(exchange, routeTemplates) {
    return function(routeKey, args) {
        let formatArgs = { ...args };
        if(args && args.intervalKey) {
            formatArgs.intervalKey = IntervalKeys[exchange][args.intervalKey];
            if(!formatArgs.intervalKey) {
                throw `Interval ${args.intervalKey} for IntervalKey."${exchange}" was not found.`;
            }
        }
        const template = routeTemplates[routeKey];
        if(template === undefined) {
            throw `Template ${routeKey} was not found.`
        }
        const url = stringFormat( template, formatArgs );
        return url;
    };
};

module.exports = {
    create: (exchange) => {
        return createRouteDelegate(exchange, exchangeRouteTemplates[exchange]);
    },
}