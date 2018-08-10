"use strict";
import MarketString from '../../../utils/MarketString';

export default function(markets, previous) {
    return markets.result.map(market => {
		const price = market.Last;
		return {
			key: market.MarketName,
			exchangeKey: market.MarketName,
			title: market.MarketName,
			price: price,
			quoteCurrency: MarketString.getQuoteCurrency(market.MarketName),
			previousPrice: previous ? (previous.find(item => item.key === market.MarketName) || {}).price : price,
			timestamp: new Date().toISOString()
		}
	})
};