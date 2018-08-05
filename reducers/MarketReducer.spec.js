"use strict";

import React from 'react';
import marketReducer from './MarketReducer';
import getMarket from './../actions/getMarket'
import renderer from 'react-test-renderer';
const ticksMock = require('../mocks/ticksMock');
const _ = require('lodash');

describe('MarketReducer', () => {
	function getData() {
		return marketReducer({}, {
			data: ticksMock.result,
			market: 'BTC-ARK'
		});
	}

	it('Reduces market history down to data points', () => {
		const data = getData();
		expect(data.historyData).toHaveLength(4);
		expect(data.historyData[0].x).toEqual(data.history[0].T);
		expect(data.historyData[0].y).toEqual(data.history[0].C);
	});

	it('Latest price is the price with the newest timestamp', () => {
		const data = getData();
		const expected = data.history[data.history.length - 1].C;
		expect(data.latestPrice).toEqual(expected);
	});

	it('Data points are floats', () => {
		const data = getData();
		data.historyData.forEach(item => expect(typeof item.y).toEqual('number'));
	});

	it('High is highest price', () => {
		const data = getData();
		expect(data.high).toEqual(0.00088399);
	});

	it('Low is lowest price', () => {
		const data = getData();
		expect(data.low).toEqual(0.00088000);
	});

	it("Volume is total volume for period expressed in BTC",  () => {
		const data = getData();
		const expected = data.history.map(i => i.V).reduce((a, b) => a + b, 0) * _.last(data.history).C;
		expect(data.volume).toEqual(expected);
	});
});