"use strict";

import _ from 'lodash';

module.exports = {
    aggregate: (flatMarkets) => {
        const result = {
            markets: _(flatMarkets)
                .filter(i => i) // Remove nulls and undefined
                .groupBy(item => `${item.quoteCurrency}`)
                .map((item) => {
                    const quoteCurrency =  _.first(item).quoteCurrency;
                    const baseCurrency =  _.first(item).baseCurrency;
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