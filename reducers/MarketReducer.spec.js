"use strict";

import marketReducer from './MarketReducer';
import sinon from 'sinon';
import MarketAggregator from './MarketAggregator';
import MarketBaseCurrency from './MarketBaseCurrency';
const ticksMock = require('../mocks/ticksMock');
const binanceTicksMock = require('../mocks/binanceTicksMock');
const _ = require('lodash');

describe('MarketReducer', () => {
	let sandbox;
	let marketBaseCurrencySpy;
	beforeEach(() => {
		sandbox = sinon.createSandbox();
		sandbox.stub(MarketAggregator, 'aggregate').callsFake(dataSets => {
			return dataSets[0];
		});
		marketBaseCurrencySpy = sandbox.stub(MarketBaseCurrency, 'process').callsFake(d => _.cloneDeep(d));
	});

	afterEach(() => {
		sandbox.restore();
	})

	function getData() {
		const binanceData = {
			data: binanceTicksMock,
			exchange: 'Binance',
			baseCurrency: 'ETH',
			quoteCurrency: 'LSK',
		};
		const bittrexData = {
			data: ticksMock,
			exchange: 'Bittrex',
			baseCurrency: 'ETH',
			quoteCurrency: 'LSK',
		};
		return marketReducer({}, {
			data: [ bittrexData, binanceData ],
			baseData: { data: [] },
			quoteCurrency: 'LSK',
			baseCurrency: 'BTC',
		});
	}

	it('Maps quote currency', () => {
		const data = getData();
		expect(data.quoteCurrency).toEqual('LSK');
	});

	it('Maps base currency', () => {
		const data = getData();
		expect(data.baseCurrency).toEqual('BTC');
	});

	it('Converts all history data to base currency', () => {
		getData();
		sinon.assert.calledOnce(marketBaseCurrencySpy);
	});

	it('Allows a breakdown of aggregated data', () => {
		const data = getData();
		expect(data.breakdown).toBeTruthy();
		expect(data.breakdown).toHaveLength(2);
	});

	it('Preserves original base currency in breakdown', () => {
		const data = getData();
		expect(_.find(data.breakdown, i => i.exchange === 'Bittrex').baseCurrency).toEqual('ETH');
	});

	it('Sorts', () => {
		const data = getData();
		expect(data.breakdown[0].exchange).toEqual('Binance');
		expect(data.breakdown[1].exchange).toEqual('Bittrex');
	});
});