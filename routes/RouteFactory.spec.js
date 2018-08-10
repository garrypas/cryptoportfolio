"use strict";

import RouteFactory from  './RouteFactory';
import stringFormat from 'string-format';
import IntervalKeys from '../constants/IntervalKeys';
import BittrexRoutes from './exchanges/BittrexRoutes';

describe('RouteFactory', () => {
    const TICKS = 'TICKS';
    const SUMMARY = 'SUMMARY';
    const TICK = 'TICK';
    let getRoute;

    beforeEach(() => {
        getRoute = RouteFactory.create()[0];
    })

    it(`Gets route for ${TICKS}`, () => {
        const route = getRoute(TICKS, 'BTC-LSK', IntervalKeys.THIRTY_MINS);
        const expectedRoute = stringFormat(BittrexRoutes[TICKS], 'BTC-LSK', IntervalKeys.THIRTY_MINS);
        expect(route.url).toEqual(expectedRoute);
    });

    it(`Gets route for ${SUMMARY}`, () => {
        const route = getRoute(SUMMARY);
        const expectedRoute = BittrexRoutes[SUMMARY];
        expect(route.url).toEqual(expectedRoute);
    });

    it(`Gets route for ${TICK}`, () => {
        const route = getRoute(TICK, 'BTC-LSK');
        const expectedRoute = stringFormat(BittrexRoutes[TICK], 'BTC-LSK');
        expect(route.url).toEqual(expectedRoute);
    });
});