"use strict";

const debug = require('debug')('app');

module.exports = (state = [], action) => {
	return {
		...state,
		myCurrencies: action.myCurrencies.map(currency => {
			return {
				key: currency,
				title: currency,
			};
		}),
		suggestions: [],
	};
};