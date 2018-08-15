"use strict";

import _ from 'lodash';
import ExchangeRates from '../utils/ExchangeRates';

module.exports = {
    aggregate: (exchangesData) => {
        const flatMarkets = _.chain(exchangesData)
            .map(e => e.markets)
            .flatten()
            .value();

        const result = {
            markets: _(flatMarkets)
                .map(item => {
                    if(item.baseCurrency === 'BTC') {
                        return item;
                    }
                    const rate = ExchangeRates.getExchangeRate(flatMarkets, 'BTC', item.baseCurrency)
                    if(!rate) {
                        return null;
                    }
                    item.price /= rate;
                    item.baseCurrency = 'BTC';
                })
                .filter(i => i) // Remove nulls and undefined
                .groupBy(item => `${item.quoteCurrency}`)
                .map((item) => {
                    let quoteCurrency = _.first(item).quoteCurrency;
                    let baseCurrency = _.first(item).baseCurrency;
                    let key = `${quoteCurrency}`;
                    return {
                        key,
                        price: _.sum(item.map(i => i.price)) / item.length,
                        previousPrice: _.sum(item.map(i => i.previousPrice)) / item.length,
                        title: key,
                        quoteCurrency: quoteCurrency,
                        baseCurrency: baseCurrency,
                        exchanges: _.flatten(item.map(i => i.exchanges))
                    };
                })
                .value()
        };
        return result;
    }
};