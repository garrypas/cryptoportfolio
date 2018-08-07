"use strict";

const debug = require('debug')('app');

function mapMyCurrencies(data) {
	return data.map(market => {
		return {
			key: market,
			title: market,
		}
	})
}

module.exports = (state = [], action) => {
	let myCurrencies = mapMyCurrencies(action.myCurrencies);
	return { ...state, myCurrencies };
}