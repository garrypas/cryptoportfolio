"use strict";
import BittrexMarketTickMapper from './Bittrex/BittrexMarketTickMapper';
import BinanceMarketTickMapper from './Binance/BinanceMarketTickMapper';

export default {
    create: (exchange) => {
        switch (exchange) {
            case 'Bittrex':
                return BittrexMarketTickMapper;
            case 'Binance':
                return BinanceMarketTickMapper;
            default:
                throw 'Could not find a Market mapper for ' + exchange;
        }
    }
};