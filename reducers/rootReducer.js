"use strict";

const reducers = {
	'Markets': require('./MarketsReducer'),
	'Market': require('./MarketReducer'),
	'MarketTick': require('./MarketTickReducer'),
	'ChangeInterval': require('./ChangeIntervalReducer'),
	'MyCurrencies': require('./MyCurrenciesReducer'),
	'FilterMarkets': require('./FilterMarketsReducer'),
	'AddToMyCurrencies': require('./AddToMyCurrenciesReducer'),
	'RemoveMyCurrency': require('./RemoveMyCurrencyReducer'),
	'MoveMyCurrency': require('./MoveMyCurrencyReducer'),
};

export default (state = [], action) => 
	reducers[action.type] ? reducers[action.type](state, action) : state;