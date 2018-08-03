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
			previousPrice: previous ? previous.find(item => item.key === market.MarketName).price : price
		}
	})
}

module.exports = (state = [], action) => {
	let markets = mapMarketItems(action.data, action.previous);
	return { markets: markets };
}