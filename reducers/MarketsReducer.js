"use strict";

const debug = require('debug')('app');
import MarketString from '../utils/MarketString';
import _ from 'lodash';
import MarketsMapperFactory from './mappers/MarketsMapperFactory';

function mapMarketItems(exchange, data, previous) {
	const mapper = MarketsMapperFactory.create(exchange);
	return mapper(data, previous);
}

function mapExchangeData (myCurrencies, thisExchangeData, previous) {
	let allMarkets = mapMarketItems(thisExchangeData.exchange, thisExchangeData.data, previous);
	
	const myMarkets = allMarkets.filter(market => {
		return myCurrencies.includes(market.key);
	}).sort((a, b) => {
		let indexA = myCurrencies.indexOf(a.key);
		let indexB = myCurrencies.indexOf(b.key);
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
	//ToDo - this will be assigned to the aggregate summary when implemented
	if(exchangeData) {
		exchangeData[0].markets[0].exchange = 'AGGREGATE';
	}
	return {
		exchangeData: exchangeData,
		markets: exchangeData[0].markets,
		allMarkets: exchangeData[0].allMarkets,
	}
}