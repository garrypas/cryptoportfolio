"use strict";

import removeMyCurrencyReducer from './RemoveMyCurrencyReducer';

describe('RemoveMyCurrencyReducer', () => {
	function getData() {
		return removeMyCurrencyReducer({
			myCurrencies: ['BTC-LSK', 'BTC-ARK']
		},
		{
			myCurrencies: [ 'BTC-LSK' ],
		});
	}

	it('Maps updated value for myCurrencies to return value', () => {
		const data = getData();
		expect(data.myCurrencies).toHaveLength(1);
	});

	it('Maps market to title', () => {
		const data = getData();
		expect(data.myCurrencies[0].title).toEqual('BTC-LSK');
	});

	it('Maps market to key', () => {
		const data = getData();
		expect(data.myCurrencies[0].key).toEqual('BTC-LSK');
	});
});