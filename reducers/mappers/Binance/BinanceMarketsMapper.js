"use strict";
import BinanceMarketString from '../../../utils/BinanceMarketString';

export default function(markets, previous) {
    return markets.map(market => {
		const price = parseFloat(market.lastPrice);
		return {
			key: market.symbol,
			exchangeKey: market.symbol,
			title: market.symbol,
			price: price,
			quoteCurrency: BinanceMarketString.getQuoteCurrency(market.symbol),
			baseCurrency: BinanceMarketString.getBaseCurrency(market.symbol),
			previousPrice: previous ? (previous.find(item => item.exchangeKey === market.symbol) || {}).price : price,
			timestamp: new Date().toISOString()
		}
	})
};