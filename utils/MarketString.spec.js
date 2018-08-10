"use strict";
import MarketString from './MarketString';

describe('MarketString', () => {
    it('Gets quote currency', () => {
        const market = 'XYZ-LSK';
        const expected = 'LSK';
        expect(MarketString.getQuoteCurrency(market)).toEqual(expected);
    });

    it('Gets base currency', () => {
        const market = 'XYZ-LSK';
        const expected = 'LSK';
        expect(MarketString.getBaseCurrency(market)).toEqual('XYZ');
    });
});
