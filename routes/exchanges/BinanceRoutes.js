"use strict";

module.exports = Object.freeze({
    EXCHANGE: 'Binance',
    TICKS: 'https://www.binance.com/api/v1/klines?symbol={0.quoteCurrency}{0.baseCurrency}&interval={0.intervalKey}',
    SUMMARY: 'https://www.binance.com/api/v1/ticker/24hr',
    TICK: 'https://www.binance.com/api/v3/ticker/price?symbol={0.quoteCurrency}{0.baseCurrency}'
});