"use strict";

import EnsureBaseCurrency from './EnsureBaseCurrency';
import MarketAggregator from './MarketAggregator';
import sinon from 'sinon';
const ticksMock = require('../mocks/ticksMock');
const _ = require('lodash');

describe('MarketReducer', () => {
	const ETHinBTC = 0.01;
	let baseData;
	let data;
	beforeEach(() => {
		baseData = [{
			historyData: [
				{ y: ETHinBTC },
				{ y: ETHinBTC },
				{ y: ETHinBTC },
				{ y: ETHinBTC },
			],
			quoteCurrency: 'ETH',
			baseCurrency: 'BTC',
		}];
		data = [{
			historyData: [
				{ y: 0.081010 },
				{ y: 0.081400 },
				{ y: 0.081010 },
				{ y: 0.081432 },
			],
			quoteCurrency: 'LSK',
			baseCurrency: 'ETH',
		}];
	})

	it('History data converted to base currency (i.e. from ETH to BTC)', () => {
		EnsureBaseCurrency.process(data, baseData, 'BTC');
		expect(data[0].historyData[0].y).toBeCloseTo(0.00081010, 8);
	});

	it('History data converted when base is smaller than market', () => {
		baseData[0].historyData.shift();
		EnsureBaseCurrency.process(data, baseData, 'BTC');
		expect(data[0].historyData).toHaveLength(3);
		expect(data[0].historyData[0].y).toBeCloseTo(0.00081400, 8);
	});

	it('History data converted when market is smaller than base', () => {
		data[0].historyData.shift();
		EnsureBaseCurrency.process(data, baseData, 'BTC');
		expect(data[0].historyData).toHaveLength(3);
		expect(data[0].historyData[0].y).toBeCloseTo(0.00081400, 8);
	});
});