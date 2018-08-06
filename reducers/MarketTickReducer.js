"use strict";

const _ = require('lodash');
import MarketString from '../utils/MarketString';

module.exports = (state = [], action) => {
	const latestPrice = action.data.last;
	let low = state.low;
	let high = state.high;
	if(latestPrice > high) {
		high = latestPrice;
	}
	if(latestPrice < low) {
		low = latestPrice;
	}
	let result = { ...state };
	result.low = low;
	result.high = high;
	result.latestPrice = latestPrice;
	return result;
}