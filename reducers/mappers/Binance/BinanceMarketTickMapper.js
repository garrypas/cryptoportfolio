"use strict";

module.exports = (toMap) => {
	return {
		last: parseFloat(toMap.data.price),
		exchange: toMap.exchange,
		baseCurrency: toMap.baseCurrency,
		quoteCurrency: toMap.quoteCurrency,
	};
}