"use strict";

module.exports = (toMap, previous = undefined) => {
	const last = parseFloat(toMap.data.price);
	return {
		last,
		exchange: toMap.exchange,
		baseCurrency: toMap.baseCurrency,
		quoteCurrency: toMap.quoteCurrency,
		previousPrice: previous ? previous.latestPrice : last,
	};
}