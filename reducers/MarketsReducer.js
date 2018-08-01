"use strict";

const debug = require('debug')('app');

module.exports = (state = [], action) => {
	let markets = [{
		"MarketName": "BTC-LSK",
		"High": 0.00000919,
		"Low": 0.00000820,
		"Volume": 74339.61396015,
		"Last": 0.00000820,
		"BaseVolume": 0.64966963,
		"TimeStamp": "2014-07-09T07:19:30.15",
		"Bid": 0.00000820,
		"Ask": 0.00000831,
		"OpenBuyOrders": 15,
		"OpenSellOrders": 15,
		"PrevDay": 0.00000821,
		"Created": "2014-03-20T06:00:00",
		"DisplayMarketName": null
	}, {
		"MarketName": "BTC-ARK",
		"High": 0.00000072,
		"Low": 0.00000001,
		"Volume": 166340678.42280999,
		"Last": 0.00000005,
		"BaseVolume": 17.59720424,
		"TimeStamp": "2014-07-09T07:21:40.51",
		"Bid": 0.00000004,
		"Ask": 0.00000005,
		"OpenBuyOrders": 18,
		"OpenSellOrders": 18,
		"PrevDay": 0.00000002,
		"Created": "2014-05-30T07:57:49.637",
		"DisplayMarketName": null
	}];
	markets = markets.map(market => {
		return {
			key: market.MarketName,
			title: market.MarketName,
			price: ((market.Ask + market.Bid) * 0.5).toFixed(8),
			baseCurrency: market.MarketName.replace('BTC-', ''), 
		}
	});
	return { markets: markets };
}