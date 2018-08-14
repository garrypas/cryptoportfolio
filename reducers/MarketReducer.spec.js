"use strict";

import marketReducer from './MarketReducer';
import sinon from 'sinon';
import MarketAggregator from './MarketAggregator';
const ticksMock = require('../mocks/ticksMock');
const _ = require('lodash');

describe('MarketReducer', () => {
	let market;
	let sandbox;
	beforeEach(() => {
		market = "BTC-ARK";
		sandbox = sinon.createSandbox();
		sandbox.stub(MarketAggregator, 'aggregate').callsFake(dataSets => {
			return dataSets[0];
		})
	})

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
});