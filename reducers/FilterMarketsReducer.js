"use strict";

const debug = require('debug')('app');

function filter(myCurrencies, suggestions) {
	const myCurrenciesNames = myCurrencies && myCurrencies.map(c => c.key);
	return suggestions.filter(cur => !myCurrenciesNames || myCurrenciesNames.includes(cur) === false);
}

module.exports = (state = [], action) => {
	const suggestions = filter(state.myCurrencies, action.suggestions)
	return { 
		...state, 
		suggestions
	};
};