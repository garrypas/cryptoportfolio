"use strict";

module.exports = Object.freeze({
    EXCHANGE: 'Bittrex',
    TICKS: 'https://bittrex.com/Api/v2.0/pub/market/GetTicks?marketName={0.baseCurrency}-{0.quoteCurrency}&tickInterval={0.intervalKey}',
    SUMMARY: 'https://bittrex.com/api/v1.1/public/getmarketsummaries',
    TICK: 'https://bittrex.com/api/v1.1/public/getticker?market={0.baseCurrency}-{0.quoteCurrency}'
});