"use strict";

import MarketsAggregator from './MarketsAggregator';
const ticksMock = require('../mocks/ticksMock');
const _ = require('lodash');

describe('MarketsAggregator', () => {
	let exchangesData;
	beforeEach(() => {
		exchangesData = [
            {
                exchange: 'E1',
                markets: [
                    { 
                        key: "BTC-LSK", exchangeKey: "BTC-LSK", title: "BTC-LSK",
			            price: 0.9, quoteCurrency: "LSK", baseCurrency: "BTC", previousPrice: 0.89,
                    },
                    { 
                        key: "BTC-ARK", exchangeKey: "BTC-ARK", title: "BTC-ARK",
			            price: 0.8, quoteCurrency: "ARK", baseCurrency: "BTC", previousPrice: 0.79,
                    },
                    { 
                        key: "ETH-STRAT", exchangeKey: "STRATETH", title: "ETH-STRAT",
			            price: 1.2, quoteCurrency: "STRAT", baseCurrency: "ETH", previousPrice: 1.24,
                    },
                ],
            },
            {
                exchange: 'E2',
                markets: [
                    { 
                        key: "LSKBTC", exchangeKey: "LSKBTC", title: "BTC-LSK",
			            price: 0.8, quoteCurrency: "LSK", baseCurrency: "BTC", previousPrice: 0.79,
                    },
                    { 
                        key: "STRATBTC", exchangeKey: "STRATBTC", title: "BTC-STRAT",
			            price: 0.7, quoteCurrency: "STRAT", baseCurrency: "BTC", previousPrice: 0.69,
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

	it('Sets the name of the exchange to "AGGREGATED"', () => {
        const aggregated = MarketsAggregator.aggregate(exchangesData);
        expect(aggregated.exchange).toEqual('AGGREGATED');
	});

    it('Maps keys', () => {
        const aggregated = MarketsAggregator.aggregate(exchangesData);
        expect(aggregated.markets[0].key).toEqual('BTC-LSK');
        expect(aggregated.markets[1].key).toEqual('BTC-ARK');
	});

    it('Maps title', () => {
        const aggregated = MarketsAggregator.aggregate(exchangesData);
        expect(aggregated.markets[0].title).toEqual('BTC-LSK');
        expect(aggregated.markets[1].title).toEqual('BTC-ARK');
	});

    it('Averages out price', () => {
        const aggregated = MarketsAggregator.aggregate(exchangesData);
        expect(aggregated.markets[0].price).toBeCloseTo(0.85, 0.00000001);
	});

    it('Averages out lastPrice', () => {
        const aggregated = MarketsAggregator.aggregate(exchangesData);
        expect(aggregated.markets[0].previousPrice).toBeCloseTo(0.84, 0.00000001);
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
});