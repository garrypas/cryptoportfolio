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
			baseCurrency: 'BTC',
			quoteCurrency: 'ARK',
		}, {
			latestPrice: 0.0001
		});
	}

	it('Gets last price', () => {
		const expected = parseFloat(binanceTickMock.price);
		const last = getData().last;
		expect(last).toEqual(expected);
	});

	it('Maps quote currency', () => {
		const quoteCurrency = getData().quoteCurrency;
		expect(quoteCurrency).toEqual('ARK');
	});

	it('Maps base currency', () => {
		const baseCurrency = getData().baseCurrency;
		expect(baseCurrency).toEqual('BTC');
	});

	it('Maps previous price', () => {
		const previousPrice = getData().previousPrice;
		expect(previousPrice).toEqual(0.00010000);
	});
});