"use strict";

import removeMyCurrencyReducer from './RemoveMyCurrencyReducer';

describe('RemoveMyCurrencyReducer', () => {
	function getData() {
		return removeMyCurrencyReducer({
			myCurrencies: ['BTC-ARK']
		},
		{
			myCurrencies: [ ],
		});
	}

	it('Maps updated value for myCurrencies to return value', () => {
		const data = getData();
		expect(data.myCurrencies).toHaveLength(0);
	});
});