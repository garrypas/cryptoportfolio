"use strict";

import MarketBaseCurrency from './MarketBaseCurrency';
import MarketAggregator from './MarketAggregator';
import sinon from 'sinon';
const ticksMock = require('../mocks/ticksMock');
const _ = require('lodash');

describe('MarketBaseCurrency', () => {
	const ETHinBTC = 0.01;
	const ETHinBTC2 = 0.009;
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
			exchange: 'E1',
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
			exchange: 'E1',
		}, ];
	})

	it('History data converted to base currency (i.e. from ETH to BTC)', () => {
		const result = MarketBaseCurrency.process(data, baseData, 'BTC');
		expect(result[0].historyData[0].y).toBeCloseTo(0.00081010, 8);
	});

	it('Does not change original data (immutable)', () => {
		const originalPrice = data[0].historyData[0].y;
		const result = MarketBaseCurrency.process(data, baseData, 'BTC');
		expect(data[0].historyData[0].y).toEqual(originalPrice);
		expect(data[0].baseCurrency).toEqual('ETH');
		expect(data[0]).not.toEqual(result[0]);
	});

	it('History data converted when base is smaller than market', () => {
		_.first(baseData).historyData.shift();
		const result = MarketBaseCurrency.process(data, baseData, 'BTC');
		expect(result[0].historyData).toHaveLength(3);
		expect(result[0].historyData[0].y).toBeCloseTo(0.00081400, 8);
	});

	it('History data converted when market is smaller than base', () => {
		data[0].historyData.shift();
		const result = MarketBaseCurrency.process(data, baseData, 'BTC');
		expect(result[0].historyData).toHaveLength(3);
		expect(result[0].historyData[0].y).toBeCloseTo(0.00081400, 8);
	});

	it('Uses correct exchange base data', () => {
		baseData.unshift({
			historyData: [
				{ y: ETHinBTC2 },
				{ y: ETHinBTC2 },
				{ y: ETHinBTC2 },
				{ y: ETHinBTC2 },
			],
			quoteCurrency: 'ETH',
			baseCurrency: 'BTC',
			exchange: 'E2',
		});
		const result = MarketBaseCurrency.process(data, baseData, 'BTC');
		expect(result[0].historyData[0].y).toBeCloseTo(0.00081010, 8);
	})
});