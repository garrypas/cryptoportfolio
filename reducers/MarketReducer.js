"use strict";

const _ = require('lodash');
import MarketString from '../utils/MarketString';

module.exports = (state = [], action) => {
	const start = action.data.length - action.range;
	const history = action.data.slice(start < 0 ? 0 : start, action.data.length);
	const latestItem = _.maxBy(history, item =>  Date.parse(item.T));
	const latestPrice = latestItem ? latestItem.C : "N/A";
	const highItem = _.maxBy(history, item => item.H);
	const high = highItem && highItem.H;
	const lowItem = _.minBy(history, item => item.L);
	const low = lowItem && lowItem.L;
	const volume = _.sum(history.map(i => i.V)) * latestPrice;
	state.low = low;
	const result = { ...state,
		historyData: history.map((item, i) => { return { x: item.T, y: item.C } }),
		history,
		key: action.market,
		quoteCurrency: MarketString.getQuoteCurrency(action.market),
		high,
		low,
		volume,
		units: 'Sats',
	};
	return result;
}