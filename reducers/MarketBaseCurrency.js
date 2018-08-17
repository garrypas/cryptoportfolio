"use strict";

import _ from 'lodash';

function process(data, baseData, baseCurrency) {
	return data.map(item => {
		const result = _.cloneDeep(item);
		if(item.baseCurrency === baseCurrency) {
			return result;
		}
		const baseItem = _.find(baseData, b => b.quoteCurrency === result.baseCurrency && b.exchange === result.exchange);
		
		for(let i = result.historyData.length - 1, j = baseItem.historyData.length - 1; i >= 0 && j >= 0; i--, j--) {
			result.historyData[i].y *= baseItem.historyData[j].y;
			result.baseCurrency = baseCurrency;
		}
		if(result.historyData.length > baseItem.historyData.length) {
			result.historyData.splice(0, result.historyData.length - baseItem.historyData.length);
		}
		return result;
	});
};

module.exports = {
	process,
};