"use strict";

import _ from 'lodash';
import currenciesAreEqual from './../utils/CurrenciesAreEqual';

function getExchangeRate(exchangeRates, baseCurrency, quoteCurrency) {
    const market = _.find(exchangeRates, m => currenciesAreEqual(m.baseCurrency, baseCurrency) 
        && currenciesAreEqual(m.quoteCurrency, quoteCurrency));
    if (!market) {
        return null;
    }
    return market.price;
}

function process(data, baseCurrency) {
    const items = data.map(item => {
        const result = _.cloneDeep(item);
        if (!currenciesAreEqual(item.baseCurrency, baseCurrency)) {
            const rate = getExchangeRate(data, baseCurrency, item.baseCurrency);
            if (rate === null) {
                return null;
            }
            result.price *= rate;
            result.previousPrice *= rate;
        }
        return result;
    }).filter(i => i);

    return items;
}

module.exports = {
    process
};