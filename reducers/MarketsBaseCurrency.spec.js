"use strict";

import MarketsBaseCurrency from './MarketsBaseCurrency';

describe('MarketsBaseCurrency', () => {
    let data;
    beforeEach(() => {
        data = [
            { baseCurrency: 'BTC', quoteCurrency: 'ETH', price: 0.01 },
            { baseCurrency: 'ETH', quoteCurrency: 'LSK', price: 0.1 },
            { baseCurrency: 'BTC', quoteCurrency: 'LSK', price: 0.00999 },
            { baseCurrency: 'BTC', quoteCurrency: 'STRAT' },
        ]
    });

    it('Converts to base currency', () => {
        const result = MarketsBaseCurrency.process(data, 'BTC');
        expect(result[1].price).toBeCloseTo(0.001, 8);
    });

    it(`Removes items that cannot be converted to the base currency`, () => {
        data.push({ baseCurrency: 'IDONTEXIST', quoteCurrency: 'STRAT' });
        const result = MarketsBaseCurrency.process(data, 'BTC');
        expect(result).toHaveLength(4);
    });

    it(`Does not modify original data (immutability)`, () => {
        const result = MarketsBaseCurrency.process(data, 'BTC');
        expect(data[1].price).toBeCloseTo(0.1, 8);
    });
});