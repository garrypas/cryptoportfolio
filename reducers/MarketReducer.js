"use strict";

const _ = require('lodash');
import MarketString from '../utils/MarketString';
import MarketMapperFactory from './mappers/MarketMapperFactory';
import MarketAggregator from './MarketAggregator';
import MarketBaseCurrency from './MarketBaseCurrency';

function map(data) {
	return data.map(data => {
		const exchange = data.exchange;
		const mapper = MarketMapperFactory.create(exchange);
		return mapper(data);
	});
}

module.exports = (state = [], action) => {
	const mapped = map(action.data);
	const baseMapped = map(action.baseData.data);

	const converted = MarketBaseCurrency.process(mapped, baseMapped, action.baseCurrency);
	const aggregated = MarketAggregator.aggregate(converted);
	return {
		...state,
		intervalIndex: action.intervalIndex,
		...aggregated,
		breakdown: mapped,
		quoteCurrency: action.quoteCurrency,
		baseCurrency: action.baseCurrency,
	};
};