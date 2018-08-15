"use strict";

import MarketsAggregator from './MarketsAggregator';
const ticksMock = require('../mocks/ticksMock');
const _ = require('lodash');

describe('MarketsAggregator', () => {
    const ETHtoBTC = 0.01;
    const StratPriceInETH = 0.007;
    const StratPriceInBTC = 0.7;

	let exchangesData;
	beforeEach(() => {
		exchangesData = [
            {
                markets: [
                    { 
                        key: "BTC-LSK", exchangeKey: "BTC-LSK", title: "BTC-LSK",
			            price: 0.9, quoteCurrency: "LSK", baseCurrency: "BTC", previousPrice: 0.89,
                        exchanges: [{ exchange: 'E1' }],
                    },
                    { 
                        key: "BTC-ARK", exchangeKey: "BTC-ARK", title: "BTC-ARK",
			            price: 0.8, quoteCurrency: "ARK", baseCurrency: "BTC", previousPrice: 0.79,
                        exchanges: [{ exchange: 'E1' }],
                    },
                    { 
                        key: "ETH-STRAT", exchangeKey: "STRATETH", title: "ETH-STRAT",
			            price: StratPriceInETH, quoteCurrency: "STRAT", baseCurrency: "ETH", previousPrice: 1.24,
                        exchanges: [{ exchange: 'E1' }],
                    },
                    { 
                        key: "BTC-ETH", exchangeKey: "ETHBTC", title: "BTC-ETH",
			            price: 0.01, quoteCurrency: "ETH", baseCurrency: "BTC", previousPrice: ETHtoBTC,
                        exchanges: [{ exchange: 'E1' }],
                    },
                ],
            },
            {
                markets: [
                    { 
                        key: "LSKBTC", exchangeKey: "LSKBTC", title: "BTC-LSK",
			            price: 0.8, quoteCurrency: "LSK", baseCurrency: "BTC", previousPrice: 0.79,
                        exchanges: [{ exchange: 'E2' }],
                    },
                    { 
                        key: "STRATBTC", exchangeKey: "STRATBTC", title: "BTC-STRAT",
			            price: StratPriceInBTC, quoteCurrency: "STRAT", baseCurrency: "BTC", previousPrice: 0.69,
                        exchanges: [{ exchange: 'E2' }],
                    },
                ],
            },
        ];
	});

    it('Flattens data set', () => {
        const aggregated = MarketsAggregator.aggregate(exchangesData);
        expect(aggregated.markets instanceof Array).toBeTruthy();
        expect(aggregated.markets[0] instanceof Array).toBeFalsy();
        expect(aggregated.markets[1] instanceof Array).toBeFalsy();
	});

	it('Exchanges that contributed to aggregate stored in array', () => {
        const aggregated = MarketsAggregator.aggregate(exchangesData);
        const exchanges = aggregated.markets[0].exchanges.map(i => i.exchange);
        expect(exchanges).toHaveLength(2);
        expect(exchanges).toContain('E1');
        expect(exchanges).toContain('E2');
	});

    it('Maps keys', () => {
        const aggregated = MarketsAggregator.aggregate(exchangesData);
        expect(aggregated.markets[0].key).toEqual('LSK');
        expect(aggregated.markets[1].key).toEqual('ARK');
	});

    it('Maps title', () => {
        const aggregated = MarketsAggregator.aggregate(exchangesData);
        expect(aggregated.markets[0].title).toEqual('LSK');
        expect(aggregated.markets[1].title).toEqual('ARK');
	});

    it('Averages out price', () => {
        const aggregated = MarketsAggregator.aggregate(exchangesData);
        expect(aggregated.markets[0].price).toBeCloseTo(0.85, 8);
	});

    it('Averages out lastPrice', () => {
        const aggregated = MarketsAggregator.aggregate(exchangesData);
        expect(aggregated.markets[0].previousPrice).toBeCloseTo(0.84, 8);
	});

    it('Maps quote currency', () => {
        const aggregated = MarketsAggregator.aggregate(exchangesData);
        expect(aggregated.markets[0].quoteCurrency).toEqual('LSK');
        expect(aggregated.markets[1].quoteCurrency).toEqual('ARK');
	});

    it('Maps base currency', () => {
        const aggregated = MarketsAggregator.aggregate(exchangesData);
        expect(aggregated.markets[0].baseCurrency).toEqual('BTC');
        expect(aggregated.markets[1].baseCurrency).toEqual('BTC');
	});

    it('Does not group items with different base currencies', () => {
        const aggregated = MarketsAggregator.aggregate(exchangesData);
        expect(aggregated.markets).toHaveLength(4);
	});

    it('Converts non-BTC to BTC', () => {
        const aggregated = MarketsAggregator.aggregate(exchangesData);
        const expected = (StratPriceInBTC + StratPriceInETH * ETHtoBTC) * 0.5;
        const actual =  _.find(aggregated.markets, item => item.quoteCurrency === 'STRAT').price;
        expect(actual).toBeCloseTo(expected, 8);
	});
});