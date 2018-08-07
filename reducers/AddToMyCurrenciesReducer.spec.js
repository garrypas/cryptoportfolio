"use strict";

import addToMyCurrenciesReducer from './AddToMyCurrenciesReducer';

describe('AddToMyCurrenciesReducer', () => {
	function getData() {
		return addToMyCurrenciesReducer({
			myCurrencies: []
		},
		{
			myCurrencies: [ 'BTC-ARK' ],
		});
	}

	it('Maps updated value for myCurrencies to return value', () => {
		const data = getData();
		expect(data.myCurrencies).toHaveLength(1);
	});
});