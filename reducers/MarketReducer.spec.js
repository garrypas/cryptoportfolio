"use strict";

import marketReducer from './MarketReducer';
import sinon from 'sinon';
import MarketAggregator from './MarketAggregator';
import MarketBaseCurrency from './MarketBaseCurrency';
const ticksMock = require('../mocks/ticksMock');
const _ = require('lodash');

describe('MarketReducer', () => {
	let market;
	let sandbox;
	let marketBaseCurrencySpy;
	beforeEach(() => {
		market = "BTC-ARK";
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
		const bittrexData = {
			data: ticksMock,
			exchange: 'Bittrex',
		};
		return marketReducer({}, {
			data: [ bittrexData ],
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
	})
});