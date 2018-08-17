"use strict";

import _ from 'lodash';

function process(data, baseData, baseCurrency) {
	data.filter(item => item.baseCurrency !== baseCurrency).forEach(item => {
		const baseItem = _.find(baseData, b => b.quoteCurrency === item.baseCurrency && b.exchange === item.exchange);
		
		for(let i = item.historyData.length - 1, j = baseItem.historyData.length - 1; i >= 0 && j >= 0; i--, j--) {
			item.historyData[i].y *= baseItem.historyData[j].y;
			item.baseCurrency = baseCurrency;
		}
		if(item.historyData.length > baseItem.historyData.length) {
			item.historyData.splice(0, item.historyData.length - baseItem.historyData.length);
		}
	});
};

module.exports = {
	process,
};