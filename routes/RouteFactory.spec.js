"use strict";

import RouteFactory from  './RouteFactory';
import stringFormat from 'string-format';
import IntervalKeys from '../constants/IntervalKeys';
import BittrexRoutes from './exchanges/BittrexRoutes';
import BinanceRoutes from './exchanges/BinanceRoutes';

describe('RouteFactory', () => {
    const TICKS = 'TICKS';
    const SUMMARY = 'SUMMARY';
    const TICK = 'TICK';
    let getRouteBittrex;
    let getRouteBinance;

    beforeEach(() => {
        getRouteBittrex = RouteFactory.create('Bittrex');
        getRouteBinance = RouteFactory.create('Binance');
    })

    it(`Gets route for ${TICKS}`, () => {
        const route = getRouteBittrex(TICKS, { baseCurrency: 'BTC', quoteCurrency: 'LSK', intervalKey: 'THIRTY_MINS' });
        const expectedRoute = stringFormat(BittrexRoutes[TICKS], { baseCurrency: 'BTC', quoteCurrency: 'LSK', intervalKey: IntervalKeys['Bittrex'].THIRTY_MINS});
        expect(route).toEqual(expectedRoute);
    });

    it(`Gets route for ${SUMMARY}`, () => {
        const route = getRouteBittrex(SUMMARY);
        const expectedRoute = BittrexRoutes[SUMMARY];
        expect(route).toEqual(expectedRoute);
    });

    it(`Gets route for ${TICK} - Bittrex`, () => {
        const route = getRouteBittrex(TICK, { baseCurrency: 'BTC', quoteCurrency: 'LSK' });
        const expectedRoute = stringFormat(BittrexRoutes[TICK], { baseCurrency: 'BTC', quoteCurrency: 'LSK' });
        expect(route).toEqual(expectedRoute);
    });

    it(`Gets route for ${TICK} - Binance`, () => {
        const route = getRouteBinance(TICK, { baseCurrency: 'BTC', quoteCurrency: 'LSK' });
        const expectedRoute = stringFormat(BinanceRoutes[TICK], { baseCurrency: 'BTC', quoteCurrency: 'LSK' });
        expect(route).toEqual(expectedRoute);
    });
});