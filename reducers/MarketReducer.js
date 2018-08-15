"use strict";

const _ = require('lodash');
import MarketString from '../utils/MarketString';
import MarketMapperFactory from './mappers/MarketMapperFactory';
import MarketAggregator from './MarketAggregator';

module.exports = (state = [], action) => {
	console.log(action);
	const mapped = action.data.map(data => {
		const exchange = data.exchange;
		const mapper = MarketMapperFactory.create(exchange);
		return mapper(data);
	});
	
	const aggregated = MarketAggregator.aggregate(mapped);

	return {
		...state,
		intervalIndex: action.intervalIndex,
		...aggregated,
		quoteCurrency: action.quoteCurrency,
		baseCurrency: action.baseCurrency,
	};
}