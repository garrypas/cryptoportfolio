"use strict";

import marketsReducer from './MarketsReducer';
import _ from 'lodash';
import MarketsMapperFactory from './mappers/MarketsMapperFactory';
import sinon from 'sinon';

describe('MarketsReducer', () => {
	let myCurrencies;
	let state;
	let sandbox;
	beforeEach(() => {
		sandbox = sinon.createSandbox();
		// Stub the mapper:
		sandbox.stub(MarketsMapperFactory, 'create').returns((market, previous) => {
			return [
				{
					key: 'BTC-LSK',
					title: 'BTC-LSK',
					price: 0.9,
					previousPrice: previous && previous[0].price,
					quoteCurrency: 'LSK',
					baseCurrency: 'BTC',
				},
				{
					key: 'BTC-ARK',
					title: 'BTC-ARK',
					price: 0.8,
					previousPrice: previous && previous[1].price,
					quoteCurrency: 'ARK',
					baseCurrency: 'BTC',
				}
			];
		});
		state = {};
		myCurrencies = [ 'LSK', 'ARK' ];
	});

	afterEach(() => {
		sandbox.restore();
	});

	function getData() {
		return marketsReducer(state, {
			data: [ { data : [ { price: 111 }, { price: 222 } ], exchange: 'EX' } ],
			myCurrencies,
		});
	}

	it("Filters based on myCurrencies", () => {
		myCurrencies = ['ARK'];
		const data = getData();
		expect(data.markets).toHaveLength(1);
		expect(data.markets[0].quoteCurrency).toEqual('ARK');
	});

	it("Sorts markets based on myCurrencies", () => {
		myCurrencies = ['ARK', 'LSK'];
		const data = getData();
		expect(data.markets).toHaveLength(2);
		expect(data.markets[0].quoteCurrency).toEqual('ARK');
		expect(data.markets[1].quoteCurrency).toEqual('LSK');
	});

	it("All markets contains unfiltered list of markets", () => {
		myCurrencies = ['ARK'];
		const data = getData();
		expect(data.allMarkets).toHaveLength(2);
		expect(data.allMarkets[0].quoteCurrency).toEqual('LSK');
	});

	it('Maps previous price', () => {
		const currentPrice = 0.9;
		const previousPrice = currentPrice - 0.1;
		// Simulate a previous state 
		state = _.cloneDeep(getData());
		state.exchangeData[0].markets[0].price -= 0.1;
		const data = getData();
        expect(data.markets[0].price).toEqual(currentPrice);
        expect(data.markets[0].previousPrice).toEqual(previousPrice);
	});

	it("Maps exchange to markets when AGGREGATED", () => {
		const data = getData();
		expect(data.markets[0].exchanges.map(e => e.exchange)).toContain('EX')
	});

	it("Maps exchange to markets when it's a particular exchange", () => {
		const data = getData();		
		expect(data.exchangeData[0].markets[0].exchanges.map(e => e.exchange)).toContain('EX')
	});
});