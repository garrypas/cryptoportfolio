"use strict";

import binanceMarketMapper from './BinanceMarketMapper';
const binanceTicksMock = require('../../../mocks/binanceTicksMock');
const _ = require('lodash');
const HIGH_PRICE = 2;
const LOW_PRICE = 3;
const CLOSE_PRICE = 4;
const VOLUME = 5;
const CLOSE_TIME = 6;

describe('BinanceMarketMapper', () => {
	const exchange = 'E2';
	let market;
	beforeEach(() => {
		market = "ARKBTC";
	})

	function getData() {
		return binanceMarketMapper({
			data: binanceTicksMock,
			market: market,
			exchange
		});
	}

	it('Maps market history to data points', () => {
		const data = getData();
		expect(data.historyData).toHaveLength(4);
		expect(data.historyData[0].x).toEqual("2018-08-03T05:29:59.999Z");
		expect(data.historyData[0].y).toEqual(parseFloat(binanceTicksMock[0][CLOSE_PRICE]));
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
		const expected = 0.31101229;
		expect(data.volume).toBeCloseTo(expected, 8);
	});

	it('Maps exchange', () => {
		const data = getData();
		expect(data.exchange).toEqual(exchange);
	});
});