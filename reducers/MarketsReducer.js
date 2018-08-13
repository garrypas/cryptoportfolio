"use strict";

const debug = require('debug')('app');
import MarketString from '../utils/MarketString';
import _ from 'lodash';
import MarketsMapperFactory from './mappers/MarketsMapperFactory';
import MarketsAggregator from './MarketsAggregator';

function mapMarketItems(exchange, data, previous) {
	const mapper = MarketsMapperFactory.create(exchange);
	return mapper(data, previous);
}

function mapExchangeData (myCurrencies, thisExchangeData, previous) {
	let allMarkets = mapMarketItems(thisExchangeData.exchange, thisExchangeData.data, previous);
	allMarkets.forEach(m => m.exchanges = [ thisExchangeData.exchange ]);
	const myMarkets = allMarkets.filter(market => {
		return myCurrencies.includes(market.quoteCurrency);
	}).sort((a, b) => {
		let indexA = myCurrencies.indexOf(a.quoteCurrency);
		let indexB = myCurrencies.indexOf(b.quoteCurrency);
		if(indexA > indexB) return 1;
		if(indexA < indexB) return -1;
		return 0;
	});

	return { markets: myMarkets, allMarkets, exchange: thisExchangeData.exchange };
}

function getExchangeData(exchangeData, exchange) {
	if(!exchangeData) {
		return undefined;
	}
	const match = _.find(exchangeData, thisData => thisData.exchange === exchange);
	if(!match) {
		return undefined;
	}
	return match.markets;
}

module.exports = (state = {}, action) => {
	const exchangeData = action.data.map(thisExchangeData => mapExchangeData(action.myCurrencies, thisExchangeData, getExchangeData(state.exchangeData, thisExchangeData.exchange)));
	const aggregated = MarketsAggregator.aggregate(exchangeData);
	return {
		exchangeData: exchangeData,
		//ToDo: this is only needed for customization, so it could just be market names...
		allMarkets: exchangeData[0].allMarkets,
		...aggregated,
	};
}