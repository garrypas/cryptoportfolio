"use strict";

import bittrexMarketsMapper from './BittrexMarketsMapper';
const summaryMock = require('../../../mocks/summaryMock');

describe('BittrexMarketsMapper', () => {
	let previous;
	beforeEach(() => {
		previous = undefined;
	});

	function getData() {
		return bittrexMarketsMapper(summaryMock, previous);
	}

	it('Adds a key to each market summary', () => {
		const data = getData();
		console.log(data);
		expect(data[0].key).toEqual('BTC-LSK');
	});

	it('Extracts quote currency from market name', () => {
		const data = getData();
		expect(data[0].quoteCurrency).toEqual('LSK');
	});

	it('Extracts base currency from market name', () => {
		const data = getData();
		expect(data[0].baseCurrency).toEqual('BTC');
	});

	it('Maps previous price', () => {
		previous = [
			{ exchangeKey: "BTC-LSK", price: 0.0009 }
		];
		const data = getData();		
		expect(data[0].previousPrice).toEqual(0.0009);
	});
});