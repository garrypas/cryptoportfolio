"use strict";

import ExchangeRates from './ExchangeRates';

describe('ExchangeRates', () => {
    let data;
    beforeEach(() => {
        data = [
            { baseCurrency: 'BTC', quoteCurrency: 'ETH', price: 0.01 },
            { baseCurrency: 'BTC', quoteCurrency: 'LSK' },
            { baseCurrency: 'ETH', quoteCurrency: 'LSK' },
            { baseCurrency: 'BTC', quoteCurrency: 'STRAT' },
        ]
    });

    it('getBaseCurrencies gets base currencies', () => {
        const bases = ExchangeRates.getBaseCurrencies(data);
        expect(bases).toHaveLength(2);
        expect(bases).toContain('BTC');
        expect(bases).toContain('ETH');
    });

    it('getExchangeRate gets exchange rate', () => {
        const rate = ExchangeRates.getExchangeRate(data, 'BTC', 'ETH');
        expect(rate).toEqual(0.01);
    });
});