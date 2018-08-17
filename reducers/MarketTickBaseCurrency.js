"use strict";

import _ from 'lodash';

function process(data, baseData, baseCurrency) {
	data.filter(item => item.baseCurrency !== baseCurrency).forEach(item => {
		const baseItem = _.find(baseData, b => b.quoteCurrency === item.baseCurrency && b.exchange === item.exchange);
		item.last *= baseItem.last;
	
	});
}

module.exports = {
	process,
};