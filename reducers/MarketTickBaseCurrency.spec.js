"use strict";

import MarketTickBaseCurrency from './MarketTickBaseCurrency';
import MarketAggregator from './MarketAggregator';
import sinon from 'sinon';
const tickMock = require('../mocks/tickMock');
const _ = require('lodash');

describe('MarketReducer', () => {
	const ETHinBTC = 0.01;
	let baseData;
	let data;
	beforeEach(() => {
		baseData = [{
			last: ETHinBTC,
			exchange: 'Bittrex',
			baseCurrency: 'BTC',
			quoteCurrency: 'ETH',
		}];
		data = [{
			last: tickMock.result.Last / ETHinBTC,
			exchange: 'Bittrex',
			baseCurrency: 'ETH',
			quoteCurrency: 'ARK',
		}]
	})

	it('Tick is converted to base currency', () => {
		MarketTickBaseCurrency.process(data, baseData, 'BTC');
		expect(data[0].last).toEqual(tickMock.result.Last);
	});

	it(`Doesn't attempt to convert data already in base currency`, () => {
		data.push({
			last: tickMock.result.Last + 0.0001,
			exchange: 'Bittrex',
			baseCurrency: 'BTC',
			quoteCurrency: 'ARK',
		});
		MarketTickBaseCurrency.process(data, baseData, 'BTC');
		expect(data[1].last).toEqual(tickMock.result.Last + 0.0001);
	});

	it('Uses correct exchange base data', () => {
		baseData.unshift({
			last: 0.99,
			exchange: 'Binance',
			baseCurrency: 'BTC',
			quoteCurrency: 'ETH',
		})
		MarketTickBaseCurrency.process(data, baseData, 'BTC');
		expect(data[0].last).toEqual(tickMock.result.Last);
	});
});