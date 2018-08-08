"use strict";

import React from 'react';
import marketTickReducer from './MarketTickReducer';
import getMarkets from './../actions/getMarkets'
import renderer from 'react-test-renderer';
import IntervalKeys from '../constants/IntervalKeys';

describe('MarketTickReducer', () => {
	const currentHigh = 0.00090000;
	const currentLow = 0.00070000;
	let last = 0.00090000;

	function getData() {
		return marketTickReducer({
			high: currentHigh,
			low: currentLow,
			latestPrice: 0.00080000,
			interval: IntervalKeys.THIRTY_MINS,
		}, { data: { last: last } });
	}

	it('Sets high when price is a new high', () => {
		last = 0.00090001;
		const data = getData();
		expect(data.high).toEqual(last);
	});

	it('Does not set high when price is not a new high', () => {
		last = 0.00089999;
		const data = getData();
		expect(data.high).toEqual(currentHigh);
	});

	it('Sets low when price is a new low', () => {
		last = 0.00069999;
		const data = getData();
		expect(data.low).toEqual(last);
	});

	it('Does not set low when price is not a new low', () => {
		last = 0.00070000;
		const data = getData();
		expect(data.low).toEqual(currentLow);
	});

	it('Updates latest price', () => {
		last = 0.00080001;
		const data = getData();
		expect(data.latestPrice).toEqual(last);
	});

	it('Copies existing state', () => {
		const data = getData();
		expect(data.interval).toEqual(IntervalKeys.THIRTY_MINS);
	});
});