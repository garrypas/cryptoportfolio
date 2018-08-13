"use strict";

import _ from 'lodash';

module.exports = {
    aggregate: (exchangesData) => {
        const result = {
            markets: _.chain(exchangesData)
                .map(e => e.markets)
                .flatten()
                .groupBy(item => `${item.baseCurrency}-${item.quoteCurrency}`)
                .map((item) => {
                    let quoteCurrency = _.first(item).quoteCurrency;
                    let baseCurrency = _.first(item).baseCurrency;
                    let key = `${baseCurrency}-${quoteCurrency}`;
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