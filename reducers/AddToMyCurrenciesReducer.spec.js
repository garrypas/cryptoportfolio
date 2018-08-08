"use strict";

import addToMyCurrenciesReducer from './AddToMyCurrenciesReducer';

describe('AddToMyCurrenciesReducer', () => {
	function getData() {
		return addToMyCurrenciesReducer({
			myCurrencies: [],
			suggestions: [ 'BTC-ARK']
		},
		{
			myCurrencies: [ 'BTC-ARK' ],
		});
	}

	it('Maps updated value for myCurrencies to return value', () => {
		const data = getData();
		expect(data.myCurrencies).toHaveLength(1);
	});

	it('Maps market to title', () => {
		const data = getData();
		expect(data.myCurrencies[0].title).toEqual('BTC-ARK');
	});

	it('Maps market to key', () => {
		const data = getData();
		expect(data.myCurrencies[0].key).toEqual('BTC-ARK');
	});

	it('Removes suggestions', () => {
		const data = getData();
		expect(data.suggestions).toHaveLength(0);
	});
});