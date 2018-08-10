"use strict";

const debug = require('debug')('app');

function mapMyCurrencies(data) {
	return data.map(currency => {
		return {
			key: currency,
			title: currency,
		}
	})
}

module.exports = (state = [], action) => {
	let myCurrencies = mapMyCurrencies(action.myCurrencies || []);
	return { ...state, myCurrencies };
}