"use strict";

const _ = require('lodash');

function formatTick(interval, tick) {
	const formatted = Date.parse(tick);
	switch(interval) {
		case 'thirtyMin':

		default:
			throw `Interval ${interval} not found.`;
	}
}

module.exports = (state = [], action) => {
	let history = [
		{ "O": 0.00081301, "H": 0.00088399, "L": 0.00088000, "C": 0.00081010, "V": 193.51270056, "T": "2018-07-11T08:50:00", "BV": 0.15749896 },
		{ "O": 0.00081400, "H": 0.00081400, "L": 0.00081400, "C": 0.00081400, "V": 151.75668371, "T": "2018-07-11T08:55:00", "BV": 0.12352992 },
		{ "O": 0.00081010, "H": 0.00081432, "L": 0.00080669, "C": 0.00081432, "V": 34.73354278, "T": "2018-07-11T09:00:00", "BV": 0.02805982 },
		{ "O": 0.00081432, "H": 0.00083432, "L": 0.00083432, "C": 0.00081432, "V": 2.36221330, "T": "2018-07-11T09:10:00", "BV": 0.00192359 },
	];

	history.forEach(item => item.P = parseFloat(((item.H + item.L) / 2).toFixed(8)));
	const latestItem = _.maxBy(history, item =>  Date.parse(item.T));
	const latestPrice = latestItem ? latestItem.P : "N/A";

	return {
		historyData: history.map((item, i) => { return { x: item.T, y: item.P } }),
		history: history,
		key: action.market,
		baseCurrency: action.market.replace('BTC-', ''), 
		latestPrice: latestPrice, 
		units: 'Sats',
	};
}