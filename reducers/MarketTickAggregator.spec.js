"use strict";

import MarketTickAggregator from './MarketTickAggregator';
const ticksMock = require('../mocks/ticksMock');

describe('MarketTickAggregator', () => {
	let market1;
	let market2;
	beforeEach(() => {
		market1 = {
			last: 10
		};
		market2 = {
			last: 6
		};
	})

	function getData() {
		return MarketTickAggregator.aggregate([
			market1, market2
		]);
	}

	it('Last price is the average of all last prices', () => {
		const data = getData();
		expect(data.last).toEqual(8);
	});
});