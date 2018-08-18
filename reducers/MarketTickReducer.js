"use strict";

const _ = require('lodash');
import MarketString from '../utils/MarketString';
import MarketTickMapperFactory from './mappers/MarketTickMapperFactory';
import MarketTickBaseCurrency from './MarketTickBaseCurrency';
import MarketTickAggregator from './MarketTickAggregator';
import MarketItemSort from './../utils/MarketItemSort';

function map(data) {
	return data.map(dataSet => {
		const mapper = MarketTickMapperFactory.create(dataSet.exchange)
		return mapper(dataSet);
	});
}

function createResult(latestPrice, state) {
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

module.exports = (state = {}, action) => {
	const mapped = map(action.data);
	const baseMapped = map(action.baseData.data);
	const baseCurrency = 'BTC';
	const converted = MarketTickBaseCurrency.process(mapped, baseMapped, baseCurrency);
	const aggregated = MarketTickAggregator.aggregate(converted);

	const breakdown = mapped.map(i => createResult(i.last, _.find(state.breakdown, 
			s => s.baseCurrency === i.baseCurrency 
			  && s.quoteCurrency === i.quoteCurrency 
			  && s.exchange === i.exchange))
	);

	

	return {
		...createResult(aggregated.last, state),
		breakdown: MarketItemSort.sort(breakdown),
	};
}