"use strict";

const debug = require('debug')('app');

module.exports = (state = [], action) => {
	let markets = action.data;
	markets = markets.map(market => {
		const price = (market.Ask + market.Bid) * 0.5;
		return {
			key: market.MarketName,
			title: market.MarketName,
			price: price,
			quoteCurrency: market.MarketName.replace('BTC-', ''), 
			previousPrice: action.previous ? action.previous.find(item => item.key === market.marketName).price : price
		}
	});
	return { markets: markets };
}