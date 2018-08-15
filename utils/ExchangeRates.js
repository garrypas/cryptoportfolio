"use strict";

import _ from 'lodash';

module.exports = {
    getBaseCurrencies: (marketData) => {
        const bases =_.map(marketData, e => e.baseCurrency);
        return _.uniq(bases);
    },
    getExchangeRate: (exchangeRates, baseCurrency, quoteCurrency) => {
        const market = _.find(exchangeRates, m => m.baseCurrency === baseCurrency && m.quoteCurrency === quoteCurrency);
        if(!market) {
            return 0;
        }
        return market.price;
    },
};