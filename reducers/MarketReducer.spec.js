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


		//ToDo: stub axios

			// let history = [
	// 	{ "O": 0.00081301, "H": 0.00088399, "L": 0.00088000, "C": 0.00081010, "V": 193.51270056, "T": "2018-07-11T08:50:00", "BV": 0.15749896 },
	// 	{ "O": 0.00081400, "H": 0.00081400, "L": 0.00081400, "C": 0.00081400, "V": 151.75668371, "T": "2018-07-11T08:55:00", "BV": 0.12352992 },
	// 	{ "O": 0.00081010, "H": 0.00081432, "L": 0.00080669, "C": 0.00081432, "V": 34.73354278, "T": "2018-07-11T09:00:00", "BV": 0.02805982 },
	// 	{ "O": 0.00081432, "H": 0.00083432, "L": 0.00083432, "C": 0.00081432, "V": 2.36221330, "T": "2018-07-11T09:10:00", "BV": 0.00192359 },
	// ];
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