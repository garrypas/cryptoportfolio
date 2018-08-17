"use strict";

module.exports = (toMap) => {
	return {
		last: toMap.data.result.Last,
		exchange: toMap.exchange,
		baseCurrency: toMap.baseCurrency,
		quoteCurrency: toMap.quoteCurrency,
	};
}