"use strict";

import React from 'react';
import myCurrenciesReducer from './MyCurrenciesReducer';
import getMyCurrencies from './../actions/getMyCurrencies'
import renderer from 'react-test-renderer';

describe('MyCurrenciesReducer', () => {
	const myCurrencies = [ 'BTC-ARK', 'BTC-LSK' ]
	function getData() {
		return myCurrenciesReducer({}, { myCurrencies } )
	}

	it('Maps all items', () => {
		const data = getData();
		expect(data.myCurrencies).toHaveLength(2);
	});

	it('Maps market names to keys', () => {
		const data = getData();
		expect(data.myCurrencies[0].key).toEqual(myCurrencies[0]);
		expect(data.myCurrencies[1].key).toEqual(myCurrencies[1]);
	});

	it('Maps market names to titles', () => {
		const data = getData();
		expect(data.myCurrencies[0].title).toEqual(myCurrencies[0]);
		expect(data.myCurrencies[1].title).toEqual(myCurrencies[1]);
	});
});