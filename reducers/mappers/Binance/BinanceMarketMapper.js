"use strict";

const _ = require('lodash');
import BinanceMarketString from '../../../utils/BinanceMarketString';
const HIGH_PRICE = 2;
const LOW_PRICE = 3;
const CLOSE_PRICE = 4;
const VOLUME = 5;
const CLOSE_TIME = 6;

module.exports = (toMap) => {
	const start = toMap.data.length - toMap.range;
	let history = toMap.data.slice(start < 0 ? 0 : start, toMap.data.length);
	history = history.map(item => {
		const price = parseFloat(item[CLOSE_PRICE]);
		return {
			V: parseFloat(item[VOLUME]),
			BV: parseFloat(item[VOLUME]) * price,
			H: parseFloat(item[HIGH_PRICE]),
			L: parseFloat(item[LOW_PRICE]),
			T: new Date(item[CLOSE_TIME]).toISOString(),
			C: price,
		}	
	});
	const latestItem = _.maxBy(history, item =>  Date.parse(item.T));
	const latestPrice = latestItem ? latestItem.C : "N/A";
	const highItem = _.maxBy(history, item => item.H);
	const high = highItem && highItem.H;
	const lowItem = _.minBy(history, item => item.L);
	const low = lowItem && lowItem.L;
	const volume = _.sum(history.map(i => i.BV));
	const result = {
		historyData: history.map((item, i) => { return { x: item.T, y: item.C } }),
		key: toMap.market,
		quoteCurrency: toMap.quoteCurrency,
		baseCurrency: toMap.baseCurrency,
		high,
		low,
		volume,
	};
	return result;
}