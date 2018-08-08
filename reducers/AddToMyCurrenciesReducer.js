"use strict";

const debug = require('debug')('app');

module.exports = (state = [], action) => {
	return {
		...state,
		myCurrencies: action.myCurrencies.map(market => {
			return {
				key: market,
				title: market,
			};
		}),
		suggestions: [],
	};
};