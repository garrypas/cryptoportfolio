"use strict";

import React from 'react';
import marketsReducer from './MarketsReducer';
import getMarkets from './../actions/getMarkets'
import renderer from 'react-test-renderer';
const summaryMock = require('../mocks/summaryMock');

describe('MarketsReducer', () => {
	function getData() {
		return marketsReducer({}, {
			data: summaryMock.result
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
});