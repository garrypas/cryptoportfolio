"use strict";

import MarketItemSort from './MarketItemSort';

describe('HourDateFormatter', () => {
    let data, item1, item2, item3, item4;

    beforeEach(() => {
        item4 = { exchange: "E2", baseCurrency: 'ETH', quoteCurrency: 'LSK' };
        item3 = { exchange: "E2", baseCurrency: 'BTC', quoteCurrency: 'LSK' };
        item2 = { exchange: "E1", baseCurrency: 'BTC', quoteCurrency: 'LSK' };
        item1 = { exchange: "E1", baseCurrency: 'BTC', quoteCurrency: 'ARK' };
        data = [item4, item3, item2, item1];
    });

    it('Sorts', () => {
        const sorted = MarketItemSort.sort(data);

        expect(sorted[0].exchange).toEqual(item1.exchange);
        expect(sorted[0].baseCurrency).toEqual(item1.baseCurrency);
        expect(sorted[0].quoteCurrency).toEqual(item1.quoteCurrency);

        expect(sorted[1].exchange).toEqual(item2.exchange);
        expect(sorted[1].baseCurrency).toEqual(item2.baseCurrency);
        expect(sorted[1].quoteCurrency).toEqual(item2.quoteCurrency);

        expect(sorted[2].exchange).toEqual(item3.exchange);
        expect(sorted[2].baseCurrency).toEqual(item3.baseCurrency);
        expect(sorted[2].quoteCurrency).toEqual(item3.quoteCurrency);

        expect(sorted[3].exchange).toEqual(item4.exchange);
        expect(sorted[3].baseCurrency).toEqual(item4.baseCurrency);
        expect(sorted[3].quoteCurrency).toEqual(item4.quoteCurrency);
    });
});