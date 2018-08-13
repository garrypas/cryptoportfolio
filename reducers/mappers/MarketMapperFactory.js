"use strict";
import BittrexMarketMapper from './Bittrex/BittrexMarketMapper';
import BinanceMarketMapper from './Binance/BinanceMarketMapper';

export default {
    create: (exchange) => {
        switch (exchange) {
            case 'Bittrex':
                return BittrexMarketMapper;
            case 'Binance':
                return BinanceMarketMapper;
            default:
                throw 'Could not find a Market mapper for ' + exchange;
        }
    }
};