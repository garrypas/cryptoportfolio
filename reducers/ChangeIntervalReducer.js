"use strict";

import MarketReducer from './MarketReducer';

module.exports = (state = [], action) => {
	return MarketReducer(state, {
		...action
	});
}