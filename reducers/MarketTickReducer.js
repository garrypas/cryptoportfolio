"use strict";

const _ = require('lodash');
import MarketString from '../utils/MarketString';
import MarketTickMapperFactory from './mappers/MarketTickMapperFactory';
import MarketTickBaseCurrency from './MarketTickBaseCurrency';
import MarketTickAggregator from './MarketTickAggregator';
import MarketItemSort from './../utils/MarketItemSort';
import currenciesAreEqual from './../utils/CurrenciesAreEqual';

function map(data, previous) {
	return data.map(dataSet => {
		const mapper = MarketTickMapperFactory.create(dataSet.exchange);
		const prev = _.find(previous, i => currenciesAreEqual(i.baseCurrency, dataSet.baseCurrency)
			&& currenciesAreEqual(i.quoteCurrency, dataSet.quoteCurrency)
			&& i.exchange === dataSet.exchange);
		return mapper(dataSet, prev);
	});
}

function createResult(tickItem, state) {
	let low = state.low;
	let high = state.high;
	let latestPrice = tickItem.last;
	let previousPrice = tickItem.previousPrice;

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
	result.previousPrice = previousPrice;
	return result;
}

module.exports = (state = {}, action) => {
	const mapped = map(action.data, state.breakdown);
	const baseMapped = map(action.baseData.data);
	const baseCurrency = action.baseCurrency;
	const converted = MarketTickBaseCurrency.process(mapped, baseMapped, baseCurrency);
	const aggregated = MarketTickAggregator.aggregate(converted);
	const breakdown = mapped.map(i => createResult(i, _.find(state.breakdown, s => s.baseCurrency === i.baseCurrency // note, don't use currenciesAreEqual here, we need the correct market
			  && s.quoteCurrency === i.quoteCurrency 
			  && s.exchange === i.exchange)));
	return {
		...createResult(aggregated, state),
		breakdown: MarketItemSort.sort(breakdown),
	};
}