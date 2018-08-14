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
		});
	}

	it('Gets last price', () => {
		const last = getData().last;
		expect(last).toEqual(tickMock.result.Last);
	});
});