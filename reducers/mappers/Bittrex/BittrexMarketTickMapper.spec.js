"use strict";

import bittrexMarketTickMapper from './BittrexMarketTickMapper';
const tickMock = require('../../../mocks/tickMock');

describe('BittrexMarketTickMapper', () => {
	let previous;
	beforeEach(() => {
		previous = undefined;
	});

	function getData() {
		return bittrexMarketTickMapper({
			data: tickMock,
			exchange: 'Bittrex',
			baseCurrency: 'BTC',
			quoteCurrency: 'ARK',
		}, {
			latestPrice: 0.00009999
		});
	}

	it('Gets last price', () => {
		const last = getData().last;
		expect(last).toEqual(tickMock.result.Last);
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
		expect(previousPrice).toEqual(0.00009999);
	});
});