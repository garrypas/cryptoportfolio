"use strict";

const _ = require('lodash');
import MarketString from '../utils/MarketString';

function formatTick(interval, tick) {
	const formatted = Date.parse(tick);
	switch(interval) {
		case 'thirtyMin':

		default:
			throw `Interval ${interval} not found.`;
	}
}

module.exports = (state = [], action) => {
	let history = action.data.slice(action.data.length - 48, action.data.length);
	history.forEach(item => item.P = (item.H + item.L) / 2);
	const latestItem = _.maxBy(history, item =>  Date.parse(item.T));
	const latestPrice = latestItem ? latestItem.P : "N/A";

	return {
		historyData: history.map((item, i) => { return { x: item.T, y: item.P } }),
		history: history,
		key: action.market,
		quoteCurrency: MarketString.getQuoteCurrency(action.market),
		latestPrice: latestPrice,
		units: 'Sats',
	};
}