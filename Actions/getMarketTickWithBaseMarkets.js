"use strict";

import axios from 'axios';
import getMyCurrencies from './getMyCurrencies';
import getMarketTick from './getMarketTick';
import _ from 'lodash';

export default function getMarketTickWithBaseMarkets(args = {}, dispatch) {
    const baseCurrency = args.baseCurrency;
    return getMarketTick(args, marketData => {
        const exchanges = _.uniqBy(args.exchanges, i => `${i.baseCurrency}:${baseCurrency}:${i.exchange}`)
            .filter(item => item.baseCurrency !== baseCurrency)
            .map(item => {
                return {
                    ...item,
                    baseCurrency,
                    quoteCurrency: item.baseCurrency,
                };
            });

        return getMarketTick({
            ...args,
            exchanges
        }, baseData => {
            dispatch({
                ...marketData,
                baseData,
                type: 'MarketTick',
                baseCurrency,
            })
        }).catch(console.error);
    });
}