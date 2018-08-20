"use strict";

import _ from 'lodash';
import currenciesAreEqual from './../utils/CurrenciesAreEqual';

function process(data, baseData, baseCurrency) {
	return data.map(item => {
		const result = _.cloneDeep(item);
		if(currenciesAreEqual(item.baseCurrency, baseCurrency)) {
			return result;
		}
		const baseItem = _.find(baseData, b => currenciesAreEqual(b.quoteCurrency, result.baseCurrency) && b.exchange === result.exchange);
		
		for(let i = result.historyData.length - 1, j = baseItem.historyData.length - 1; i >= 0 && j >= 0; i--, j--) {
			result.historyData[i].y *= baseItem.historyData[j].y;
			result.baseCurrency = baseCurrency;
		}
		if(result.historyData.length > baseItem.historyData.length) {
			result.historyData.splice(0, result.historyData.length - baseItem.historyData.length);
		}
		result.high = _.maxBy(result.historyData, i => i.y).y;
		result.low = _.minBy(result.historyData, i => i.y).y;
		result.volume *= _.last(baseItem.historyData).y;
		return result;
	});
};

module.exports = {
	process,
};