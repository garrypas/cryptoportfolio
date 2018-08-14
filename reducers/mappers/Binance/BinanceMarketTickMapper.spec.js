"use strict";

import binanceMarketTickMapper from './BinanceMarketTickMapper';
const binanceTickMock = require('../../../mocks/binanceTickMock');

describe('BinanceMarketTickMapper', () => {
	let previous;
	beforeEach(() => {
		previous = undefined;
	});

	function getData() {
		return binanceMarketTickMapper({
			data: binanceTickMock,
			exchange: 'Binance',
		});
	}

	it('Gets last price', () => {
		const expected = parseFloat(binanceTickMock.price);
		const last = getData().last;
		expect(last).toEqual(expected);
	});
});