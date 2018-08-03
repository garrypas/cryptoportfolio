"use strict";

const debug = require('debug')('app');

module.exports = (state = [], action) => {
	let markets = action.data;
	markets = markets.map(market => {
		return {
			key: market.MarketName,
			title: market.MarketName,
			price: (market.Ask + market.Bid) * 0.5,
			quoteCurrency: market.MarketName.replace('BTC-', ''), 
		}
	});
	return { markets: markets };
}