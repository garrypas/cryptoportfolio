"use strict";

import moveMyCurrencyReducer from './MoveMyCurrencyReducer';

describe('MoveMyCurrencyReducer', () => {
	function getData() {
		return moveMyCurrencyReducer({
			myCurrencies: [ 'BTC-ARK' ],
		},
		{
			myCurrencies: [ 'BTC-ARK' ],
		});
	}

	it('Maps myCurrencies to return value', () => {
		const data = getData();
		expect(data.myCurrencies).toHaveLength(1);
		expect(data.myCurrencies[0].key).toEqual('BTC-ARK');
	});
});