"use strict";

import _ from 'lodash';
import ExchangeRates from '../utils/ExchangeRates';

module.exports = {
    aggregate: (exchangesData) => {
        const baseCurrency = 'BTC';

        const flatMarkets = _.chain(exchangesData)
            .map(e => e.markets)
            .flatten()
            .value();

        const result = {
            markets: _(flatMarkets)
                .map(item => {
                    if(item.baseCurrency === baseCurrency) {
                        return item;
                    }
                    const rate = ExchangeRates.getExchangeRate(flatMarkets, baseCurrency, item.baseCurrency)
                    if(!rate) {
                        return null;
                    }
                    item.price *= rate;
                    return item;
                })
                .filter(i => i) // Remove nulls and undefined
                .groupBy(item => `${item.quoteCurrency}`)
                .map((item) => {
                    const quoteCurrency =  _.first(item).quoteCurrency;
                    const key = quoteCurrency;
                    return {
                        key,
                        price: _.sum(item.map(i => i.price)) / item.length,
                        previousPrice: _.sum(item.map(i => i.previousPrice)) / item.length,
                        title: key,
                        quoteCurrency: quoteCurrency,
                        // The base currency of this aggregated price
                        baseCurrency: baseCurrency,
                        exchanges: _.flatten(item.map(i => {
                            return i.exchanges.map(e => {
                                return {
                                    exchange: e.exchange,
                                    quoteCurrency: i.quoteCurrency,
                                    baseCurrency: i.baseCurrency,
                                }
                            })
                        }))
                    };
                })
                .value()
        };
        return result;
    }
};