"use strict";

/**
 * Currencies will be parsed through each function here, in order. Add more if needed.
 */
const cleaners = [
    // Tether === USD
    currency => currency === "USDT" ? "USD" : currency,
    // Differing Bitcoin Cash symbols
    currency => currency === "BCC" ? "BCH" : currency,
];

/**
 * Ensure a case insensitive comparison for ticker symbols
 */
function fixCase(currency) {
    return currency.toUpperCase();
}

export default(currency) =>
    cleaners.reduce((prev, func) => func(prev), fixCase(currency));