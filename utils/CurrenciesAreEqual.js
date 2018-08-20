"use strict";

function cleanTether(currency) {
    return currency.toUpperCase() === "USDT" ? "USD" : currency;
}

function fixCase(currency) {
    return currency.toUpperCase();
}

function clean(currency) {
    currency = cleanTether(currency);
    currency = fixCase(currency);
    return currency;
}

export default function(currencyX = "", currencyY = "") {
    currencyX = clean(currencyX);
    currencyY = clean(currencyY);
    return currencyX == currencyY;
};