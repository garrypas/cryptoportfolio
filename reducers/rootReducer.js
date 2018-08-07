"use strict";

const reducers = {
	'GET_MARKETS': require('./MarketsReducer'),
	'GET_MARKET': require('./MarketReducer'),
	'GET_MARKET_TICK': require('./MarketTickReducer'),
	'CHANGE_INTERVAL': require('./ChangeIntervalReducer'),
	'GET_MY_CURRENCIES': require('./MyCurrenciesReducer'),
	'FILTER_MARKETS': require('./FilterMarketsReducer'),
	'ADD_TO_MY_CURRENCIES': require('./AddToMyCurrenciesReducer'),
	'REMOVE_MY_CURRENCY': require('./RemoveMyCurrencyReducer'),
};

export default (state = [], action) => 
	reducers[action.type] ? reducers[action.type](state, action) : state;