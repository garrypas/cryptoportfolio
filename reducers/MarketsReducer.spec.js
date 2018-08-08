"use strict";

import marketsReducer from './MarketsReducer';
const summaryMock = require('../mocks/summaryMock');

describe('MarketsReducer', () => {
	let myCurrencies;
	beforeEach(() => {
		myCurrencies = ['BTC-ARK', 'BTC-LSK'];
	});

	function getData() {
		return marketsReducer({ }, {
			data: summaryMock.result,
			myCurrencies
		});
	}

	it('Adds a key to each market summary', () => {
		const data = getData();
		expect(data.markets[0].key).toEqual('BTC-LSK');
	});

	it('Prices are floats', () => {
		const data = getData();
		expect(typeof data.markets[0].price).toEqual('number');
	});

	it('Extracts base currency from market name', () => {
		const data = getData();
		expect(data.markets[0].quoteCurrency).toEqual('LSK');
	});

	it("Filters based on myCurrencies", () => {
		myCurrencies = ['BTC-ARK'];
		const data = getData();
		expect(data.markets).toHaveLength(1);
		expect(data.markets[0].quoteCurrency).toEqual('ARK');
	});

	it("All markets contains unfiltered list of markets", () => {
		myCurrencies = ['BTC-ARK'];
		const data = getData();
		expect(data.allMarkets).toHaveLength(2);
		expect(data.allMarkets[0].quoteCurrency).toEqual('LSK');
	});
});