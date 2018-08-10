"use strict";

import marketReducer from './MarketReducer';
const ticksMock = require('../mocks/ticksMock');
const _ = require('lodash');

describe('MarketReducer', () => {
	let market;
	beforeEach(() => {
		market = "BTC-ARK";
	})

	function getData() {
		return marketReducer({}, {
			data: ticksMock.result,
			market: market,
		});
	}

	it('Reduces market history down to data points', () => {
		const data = getData();
		expect(data.historyData).toHaveLength(4);
		expect(data.historyData[0].x).toEqual(ticksMock.result[0].T);
		expect(data.historyData[0].y).toEqual(ticksMock.result[0].C);
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
		expect(data.low).toEqual(0.00080669);
	});

	it("Volume is total volume for period expressed in BTC",  () => {
		const data = getData();
		const expected = ticksMock.result.map(i => i.V).reduce((a, b) => a + b, 0) * _.last(ticksMock.result).C;
		expect(data.volume).toEqual(expected);
	});

	it('Units is base currency', () => {
		const data = getData();
		expect(data.units).toEqual('Sats');
	});

	it('Units is base currency - sats when BTC', () => {
		market = "ETH-ARK";
		const data = getData();
		expect(data.units).toEqual('ETH');
	});
});