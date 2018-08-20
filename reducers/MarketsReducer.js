"use strict";

const debug = require('debug')('app');
import MarketString from '../utils/MarketString';
import _ from 'lodash';
import MarketsMapperFactory from './mappers/MarketsMapperFactory';
import MarketsAggregator from './MarketsAggregator';
import MarketsBaseCurrency from './MarketsBaseCurrency';
import currenciesAreEqual from './../utils/CurrenciesAreEqual';

function mapMarketItems(exchange, data, previous) {
	const mapper = MarketsMapperFactory.create(exchange);
	return mapper(data, previous);
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
	const baseCurrency = 'BTC';
	const myCurrencies = action.myCurrencies || [];
	const exchangeData = action.data.map(thisExchangeData => {
		const previous = getExchangeData(state.exchangeData, thisExchangeData.exchange);
		const mapped = mapMarketItems(thisExchangeData.exchange, thisExchangeData.data, previous);
		mapped.forEach(m => m.exchanges = [{ 
			exchange: thisExchangeData.exchange,
			quoteCurrency: m.quoteCurrency,
			baseCurrency: m.baseCurrency,
		} ]);
		return { markets: mapped, exchange: thisExchangeData.exchange };
	});

	const flatMarkets = _.chain(exchangeData)
		.map(e => e.markets)
		.flatten()
		.value();

	const converted = MarketsBaseCurrency.process(flatMarkets, baseCurrency).concat(
		MarketsBaseCurrency.process(flatMarkets.filter(i => currenciesAreEqual(i.quoteCurrency, baseCurrency)), 'USDT')
	);

	const aggregated = MarketsAggregator.aggregate(converted);

	const myAggregatedMarkets = aggregated.markets.filter(market => {
		return myCurrencies.includes(market.quoteCurrency);
	}).sort((a, b) => {
		let indexA = myCurrencies.indexOf(a.quoteCurrency);
		let indexB = myCurrencies.indexOf(b.quoteCurrency);
		if(indexA > indexB) return 1;
		if(indexA < indexB) return -1;
		return 0;
	});

	return {
		exchangeData,
		allMarkets: aggregated.markets.map(m => ({ quoteCurrency: m.quoteCurrency })),
		markets: myAggregatedMarkets,
	};
}