"use strict";

import marketsReducer from './MarketsReducer';
const summaryMock = require('../mocks/summaryMock');
import _ from 'lodash';

describe('MarketsReducer', () => {
	let myCurrencies;
	let state;
	beforeEach(() => {
		state = {};
		myCurrencies = [ 'BTC-LSK', 'BTC-ARK' ];
	});

	function getData() {
		return marketsReducer(state, {
			data: [ { data: summaryMock.result } ],
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

	it("Sorts markets based on myCurrencies", () => {
		myCurrencies = ['BTC-ARK', 'BTC-LSK'];
		const data = getData();
		expect(data.markets).toHaveLength(2);
		expect(data.markets[0].quoteCurrency).toEqual('ARK');
		expect(data.markets[1].quoteCurrency).toEqual('LSK');
	});

	it("All markets contains unfiltered list of markets", () => {
		myCurrencies = ['BTC-ARK'];
		const data = getData();
		expect(data.allMarkets).toHaveLength(2);
		expect(data.allMarkets[0].quoteCurrency).toEqual('LSK');
	});

    it('First item exchange is AGGREGATE', () => {
		const data = getData();
        expect(data.markets[0].exchange).toEqual('AGGREGATE');
    });

	it('Maps previous price', () => {
		const currentPrice = summaryMock.result[0].Last;
		const previousPrice = currentPrice - 0.1;
		// Simulate a previous state 
		state = _.cloneDeep(getData());
		state.exchangeData[0].markets[0].price -= 0.1;
		const data = getData();
        expect(data.markets[0].price).toEqual(currentPrice);
        expect(data.markets[0].previousPrice).toEqual(previousPrice);
	});
});