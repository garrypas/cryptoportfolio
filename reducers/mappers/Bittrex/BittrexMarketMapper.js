"use strict";

const _ = require('lodash');
import MarketString from '../../../utils/MarketString';
import fillHoles from './../../../utils/FillHoles';

module.exports = (toMap) => {
	const data = fillHoles(toMap.data.result, toMap.intervalIndex);
	const start = data.length - toMap.range;
	const history = data.slice(start < 0 ? 0 : start, data.length);
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
		market: toMap.quoteCurrency,
		high,
		low,
		volume,
	};
	return result;
}