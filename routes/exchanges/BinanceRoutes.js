"use strict";

export default Object.freeze({
    EXCHANGE: 'Binance',
    TICKS: 'https://www.binance.com/api/v1/klines?symbol={}&interval={}',
    SUMMARY: 'https://www.binance.com/api/v1/ticker/24hr',
    TICK: 'https://www.binance.com/api/v3/ticker/price?symbol={}'
});