"use strict";

const debug = require('debug')('app');

module.exports = (state = [], action) => {
	return {
		...state,
		myCurrencies: action.myCurrencies.map(c => {
			return { key: c, title: c };
		})
	};
};