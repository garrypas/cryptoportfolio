"use strict";

import axios from 'axios';
import getMyCurrencies from './getMyCurrencies';
import getMarket from './getMarket';
import _ from 'lodash';

export default function getMarketWithBaseMarkets(args = {}, dispatch) {
    const baseCurrency = 'BTC';
    return getMarket(args, marketData => {
        let results = [];
        const exchanges = _.uniqBy(args.exchanges, i => `${i.baseCurrency}:${baseCurrency}:${i.exchange}`)
            .filter(item => /*item.baseCurrency !== 'BNB' && */ item.baseCurrency !== baseCurrency)
            .map(item => {
                return {
                    ...item,
                    baseCurrency,
                    quoteCurrency: item.baseCurrency,
                };
            });

        return getMarket({
            ...args,
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