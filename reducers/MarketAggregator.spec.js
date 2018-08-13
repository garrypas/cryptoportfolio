"use strict";

import MarketAggregator from './MarketAggregator';
const ticksMock = require('../mocks/ticksMock');

describe('MarketAggregator', () => {
	let market1;
	let market2;
	beforeEach(() => {
		market1 = {
			historyData: [ {x: 'i2', y: 4 }],
			key: 'k',
			high: 10,
			low: 2,
			volume: 50,
		};
		market2 = {
			historyData: [ {x: 'i1', y: 8 },  {x: 'i2', y: 8 }],
			key: 'k',
			high: 12,
			low: 4,
			volume: 100,
		};
	})

	function getData() {
		return MarketAggregator.aggregate([
			market1, market2
		]);
	}

	it('History data y axis is average of y axis points', () => {
		const data = getData();
		expect(data.historyData[1].y).toEqual(6);
	});

	it('History data length is correct', () => {
		const data = getData();
		expect(data.historyData).toHaveLength(2);
	});

	it('Forms x-axis correctly', () => {
		const data = getData();
		expect(data.historyData[0].x).toEqual('i1');
		expect(data.historyData[1].x).toEqual('i2');
	});

	it('High is average of high values', () => {
		const data = getData();
		expect(data.high).toEqual(11);
	});

	it('Low is average of low values', () => {
		const data = getData();
		expect(data.low).toEqual(3);
	});

	it('Volume is average of volumes', () => {
		const data = getData();
		expect(data.volume).toEqual(75);
	});
});