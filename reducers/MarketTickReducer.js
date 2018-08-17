"use strict";

const _ = require('lodash');
import MarketString from '../utils/MarketString';
import MarketTickMapperFactory from './mappers/MarketTickMapperFactory';
import MarketTickBaseCurrency from './MarketTickBaseCurrency';

function map(data) {
	return data.map(dataSet => {
		const mapper = MarketTickMapperFactory.create(dataSet.exchange)
		return mapper(dataSet);
	});
}

module.exports = (state = [], action) => {
	const mapped = map(action.data);
	const baseMapped = map(action.baseData.data);
	const baseCurrency = 'BTC';
	MarketTickBaseCurrency.process(mapped, baseMapped, baseCurrency);
	const latestPrice = _.mean(mapped.map(i => i.last));
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