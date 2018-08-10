"use strict";

export default Object.freeze({
    EXCHANGE: 'Bittrex',
    TICKS: 'https://bittrex.com/Api/v2.0/pub/market/GetTicks?marketName={}&tickInterval={}',
    SUMMARY: 'https://bittrex.com/api/v1.1/public/getmarketsummaries',
    TICK: 'https://bittrex.com/api/v1.1/public/getticker?market={}'
});