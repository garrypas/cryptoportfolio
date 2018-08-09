"use strict";

import filterMarketsReducer from './FilterMarketsReducer';

describe('FilterMarketsReducer', () => {
	let myCurrencies;
	beforeEach(() => {
		myCurrencies = [];
	})

	function getData() {
		return filterMarketsReducer({
			myCurrencies: myCurrencies,
		},
		{
			myCurrencies: [{ "key": 'BTC-ARK' }],
			suggestions: ['BTC-ARK'],
		});
	}

	it('Maps suggestions', () => {
		const data = getData();
		expect(data.suggestions instanceof Array).toBeTruthy();
		expect(data.suggestions).toHaveLength(1);
		expect(data.suggestions[0]).toEqual('BTC-ARK');
	});

	it('Maps suggestions when myCurrencies has no value (i.e. first call)', () => {
		myCurrencies = null;
		const data = getData();
		expect(data.suggestions instanceof Array).toBeTruthy();
		expect(data.suggestions).toHaveLength(1);
		expect(data.suggestions[0]).toEqual('BTC-ARK');
	});

	it('Excludes markets already in myCurrencies from suggestions', () => {
		myCurrencies.push({ "key": 'BTC-ARK' })
		const data = getData();
		expect(data.suggestions).toHaveLength(0);
	});
});