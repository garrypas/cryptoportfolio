"use strict";

import React from 'react';
import marketTickReducer from './MarketTickReducer';
import MarketTickAggregator from './MarketTickAggregator';
import MarketTickBaseCurrency from './MarketTickBaseCurrency';
import sinon from 'sinon';
import _ from 'lodash';

describe('MarketTickReducer', () => {
	const currentHigh = 0.00090000;
	const currentLow = 0.00070000;
	let last = 0.00090000;
	let sandbox;
	let marketTickBaseCurrencySpy;
	const previousPrice = 0.00080000;

	beforeEach(() => {
		sandbox = sinon.createSandbox();
		marketTickBaseCurrencySpy = sandbox.spy(MarketTickBaseCurrency, 'process');
	})

	afterEach(() => {
		sandbox.restore();
	})

	function getData() {
		return marketTickReducer({
			high: currentHigh,
			low: currentLow,
			latestPrice: previousPrice,
			interval: 'THIRTY_MINS',
			breakdown: [
				{ baseCurrency: 'BTC', quoteCurrency: 'LSK', exchange:'Bittrex', latestPrice: previousPrice, },
				{ baseCurrency: 'ETH', quoteCurrency: 'LSK', exchange:'Bittrex', latestPrice: previousPrice * 100, },
			],
		}, {
			data: [{ 
				data: { result: { Last: last * 100 } }, 
				exchange: 'Bittrex',
				baseCurrency: 'ETH', 
				quoteCurrency: 'LSK'
			}, { 
				data: { result: { Last: last } }, 
				exchange: 'Bittrex',
				baseCurrency: 'BTC', 
				quoteCurrency: 'LSK'
			}],
			baseData: { data: [
				{
					data: { result: { Last: 0.01 } },
					baseCurrency: 'BTC', quoteCurrency: 'ETH', exchange: 'Bittrex',
				},
			] },
			baseCurrency: 'BTC',
			quoteCurrency: 'LSK',
		});
	}

	it('Sets high when price is a new high', () => {
		last = 0.00090001;
		const data = getData();
		expect(data.high).toEqual(last);
	});

	it('Does not set high when price is not a new high', () => {
		last = 0.00089999;
		const data = getData();
		expect(data.high).toEqual(currentHigh);
	});

	it('Sets low when price is a new low', () => {
		last = 0.00069999;
		const data = getData();
		expect(data.low).toEqual(last);
	});

	it('Does not set low when price is not a new low', () => {
		last = 0.00070000;
		const data = getData();
		expect(data.low).toEqual(currentLow);
	});

	it('Updates latest price', () => {
		last = 0.00080001;
		const data = getData();
		expect(data.latestPrice).toBeCloseTo(last, 8);
	});

	it('Copies existing state', () => {
		const data = getData();
		expect(data.interval).toEqual('THIRTY_MINS');
	});

	it('Converts price to base currency', () => {
		getData();
		sinon.assert.calledOnce(marketTickBaseCurrencySpy);
	});

	it('Breakdown returned as an Array', () => {
		const data = getData();
		expect(data.breakdown instanceof Array).toBeTruthy();
		expect(data.breakdown).toHaveLength(2);
	});

	it('Sorts breakdown result', () => {
		const data = getData();
		expect(data.breakdown[0].baseCurrency).toEqual('BTC');
		expect(data.breakdown[1].baseCurrency).toEqual('ETH');
	});

	it('Maps previous price', () => {
		const data = getData();
		expect(data.previousPrice).toEqual(previousPrice);
	});
});