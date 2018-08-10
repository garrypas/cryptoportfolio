"use strict";

import binanceMarketsMapper from './BinanceMarketsMapper';
const binanceSummaryMock = require('../../../mocks/binanceSummaryMock');

describe('BinanceMarketsMapper', () => {
	let previous;
	beforeEach(() => {
		previous = undefined;
	});

	function getData() {
		return binanceMarketsMapper(binanceSummaryMock, previous);
	}

	it('Adds a key to each market summary', () => {
		const data = getData();
		expect(data[0].key).toEqual('ETHBTC');
	});

	it('Prices are floats', () => {
		const data = getData();
		expect(typeof data[0].price).toEqual('number');
	});

	it('Extracts base currency from market name', () => {
		const data = getData();
		expect(data[0].quoteCurrency).toEqual('ETH');
	});

	it('Maps previous price', () => {
		previous = [
			{ exchangeKey: "ETHBTC", price: 0.0009 }
		];
		const data = getData();		
		expect(data[0].previousPrice).toEqual(0.0009);
	});
});