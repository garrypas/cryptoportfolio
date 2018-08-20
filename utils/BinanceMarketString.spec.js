"use strict";
import BinanceMarketString from './BinanceMarketString';

describe('BinanceMarketString', () => {
    it('Gets quote currency', () => {
        const market = 'ETHBTC';
        const expected = 'ETH';
        expect(BinanceMarketString.getQuoteCurrency(market)).toEqual(expected);
    });

    it("Gets quote currency when base isn't 3 characters", () => {
        const market = 'ETHUSDT';
        const expected = 'ETH';
        expect(BinanceMarketString.getQuoteCurrency(market)).toEqual(expected);
    });

    it('Gets base currency', () => {
        const market = 'VAPECOINBTC';
        const expected = 'BTC';
        expect(BinanceMarketString.getBaseCurrency(market)).toEqual(expected);
    });

    it("Gets base currency when it isn't 3 characters", () => {
        const market = 'BTCUSDT';
        const expected = 'USDT';
        expect(BinanceMarketString.getBaseCurrency(market)).toEqual(expected);
    });
});
