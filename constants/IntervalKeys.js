"use strict";
import BittrexIntervalKeys from './BittrexIntervalKeys';
import BinanceIntervalKeys from './BinanceIntervalKeys';

module.exports = Object.freeze({
    ONE_DAY: '1Day',
    FIVE_DAYS: '5Days',
    THIRTY_DAYS: '30Days',
    NINETY_DAYS: '90Days',
    SIX_MONTHS: '6Months',
    ONE_YEAR: '1Year',
    Bittrex: BittrexIntervalKeys,
    Binance: BinanceIntervalKeys,
});