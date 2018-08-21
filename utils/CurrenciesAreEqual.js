"use strict";

import cleanCurrency from './CleanCurrency';

/**
 * Compares two ticker symbols for equality. Returns true for different symbols representing the same
 * currency - for example BCC and BCH are both used to represent Bitcoin Cash.
 * @param {*} currencyX a currency symbol
 * @param {*} currencyY a second currency symbol
 */
export default (currencyX = "", currencyY = "") => 
    cleanCurrency(currencyX) === cleanCurrency(currencyY);