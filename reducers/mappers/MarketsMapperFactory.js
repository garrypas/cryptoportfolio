"use strict";
import BittrexMarketsMapper from './Bittrex/BittrexMarketsMapper';
import BinanceMarketsMapper from './Binance/BinanceMarketsMapper';

export default {
    create: (exchange) => {
        switch (exchange) {
            case 'Bittrex':
                return BittrexMarketsMapper;
            case 'Binance':
                return BinanceMarketsMapper;
            default:
                throw 'Could not find a Markets mapper for ' + exchange;
        }
    }
};