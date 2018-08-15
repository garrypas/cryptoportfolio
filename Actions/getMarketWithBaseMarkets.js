"use strict";

import axios from 'axios';
import getMyCurrencies from './getMyCurrencies';
import getMarket from './getMarket';
import getMarketTick from './getMarketTick';
import _ from 'lodash';

module.exports = (args = {}, dispatch) => {
    const baseCurrency = 'BTC';
    return getMarket(args, marketData => {
        let results = [];
        const exchanges = _.uniqBy(args.exchanges, i => `${i.baseCurrency}:${baseCurrency}:${i.exchange}`)
            .filter(item => item.baseCurrency !== 'BNB' && item.baseCurrency !== baseCurrency)
            .map(item => {
                return {
                    ...item,
                    baseCurrency,
                    quoteCurrency: item.baseCurrency,
                };
            });

        return getMarketTick({
            exchanges
        }, baseData => {
            dispatch({
                ...marketData,
                baseData,
                type: 'Market',
            })
        }).catch(console.error);
    });
}