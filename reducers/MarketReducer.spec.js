"use strict";

import React from 'react';
import marketReducer from './MarketReducer';
import getMarket from './../actions/getMarket'
import renderer from 'react-test-renderer';

describe('MarketReducer', () => {
	function getData() {
		const action = {
			...getMarket({ market: 'BTC-ARK' })
		};
		return marketReducer({}, action);
	}

	it('Reduces market history down to data points', () => {
		const data = getData();
		expect(data.historyData).toHaveLength(4);
		expect(data.historyData[0].x).toEqual(data.history[0].T);
		expect(data.historyData[0].y).toEqual(data.history[0].P);
	});

	it('Latest price is the price with the newest timestamp', () => {
		const data = getData();
		const expected = data.history[data.history.length - 1].P;
		expect(data.latestPrice).toEqual(expected);
	});

	it('Data points are floats', () => {
		const data = getData();
		data.historyData.forEach(item => expect(typeof item.y).toEqual('number'));
	});
});