"use strict";

const debug = require('debug')('app');

module.exports = (state = [], action) => {
	return { 
		...state, 
		suggestions: action.suggestions 
	};
};