"use strict";

import _ from 'lodash';

function process(data, baseData, baseCurrency) {
	return data.map(item => {
		const result = _.cloneDeep(item);
		if(item.baseCurrency !== baseCurrency) {
			const baseItem = _.find(baseData, b => b.quoteCurrency === item.baseCurrency && b.exchange === item.exchange);
			result.last *= baseItem.last;
			result.previousPrice *= baseItem.last;
			result.baseCurrency = baseCurrency;
		}
		return result;
	});
}

module.exports = {
	process,
};