"use strict";

const reducers = {
	'GET_MARKETS': require('./MarketsReducer'),
	'GET_MARKET': require('./MarketReducer'),
};

export default (state = [], action) => 
	reducers[action.type] ? reducers[action.type](state, action) : state;