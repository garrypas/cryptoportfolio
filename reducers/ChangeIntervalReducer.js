"use strict";

const _ = require('lodash');
import MarketString from '../utils/MarketString';

module.exports = (state = [], action) => {
	return { interval: action.interval };
}