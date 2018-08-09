"use strict";

const debug = require('debug')('app');
import MarketString from '../utils/MarketString';

function mapMarketItems(data, previous) {
	return data.map(market => {
		const price = market.Last;
		return {
			key: market.MarketName,
			title: market.MarketName,
			price: price,
			quoteCurrency: MarketString.getQuoteCurrency(market.MarketName),
			previousPrice: previous ? (previous.find(item => item.key === market.MarketName) || {}).price : price
		}
	})
}

module.exports = (state = [], action) => {
	const myCurrencies = action.myCurrencies;
	let allMarkets = mapMarketItems(action.data, action.previous);
	
	const myMarkets = allMarkets.filter(market => {
		return myCurrencies.includes(market.key);
	}).sort((a, b) => {
		let indexA = myCurrencies.indexOf(a.key);
		let indexB = myCurrencies.indexOf(b.key);
		if(indexA > indexB) return 1;
		if(indexA < indexB) return -1;
		return 0;
	});

	return { markets: myMarkets, allMarkets };
}