"use strict";

const debug = require('debug')('app');
import MarketString from '../utils/MarketString';
import _ from 'lodash';

function mapMarketItems(data, previous) {
	return data.map(market => {
		const price = market.Last;
		return {
			key: market.MarketName,
			title: market.MarketName,
			price: price,
			quoteCurrency: MarketString.getQuoteCurrency(market.MarketName),
			previousPrice: previous ? (previous.find(item => item.key === market.MarketName) || {}).price : price,
			timestamp: new Date().toISOString()
		}
	})
}

function mapExchangeData (myCurrencies, thisExchangeData, previous) {
	let allMarkets = mapMarketItems(thisExchangeData.data, previous);
	
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

module.exports = (state = [], action) => {
	const exchangeData = action.data.map(thisExchangeData => mapExchangeData(action.myCurrencies, thisExchangeData, getExchangeData(state.exchangeData, thisExchangeData.exchange)));
	//ToDo - this will be assigned to the aggregate summary when implemented
	exchangeData[0].markets[0].exchange = 'AGGREGATE';
	return {
		exchangeData: exchangeData,
		markets: exchangeData[0].markets,
		allMarkets: exchangeData[0].allMarkets,
	}
}