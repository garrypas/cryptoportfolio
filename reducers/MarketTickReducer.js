"use strict";

const _ = require('lodash');
import MarketString from '../utils/MarketString';
import MarketTickMapperFactory from './mappers/MarketTickMapperFactory';

module.exports = (state = [], action) => {
	const latestPrice = _.mean(action.data.map(dataSet => {
		const mapper = MarketTickMapperFactory.create(dataSet.exchange)
		return mapper(dataSet).last;
	}));
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