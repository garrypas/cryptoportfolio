"use strict";

import getRoute from  './getRoute';
import stringFormat from 'string-format';
import Routes from './Routes';
import IntervalKeys from '../constants/IntervalKeys';

describe(' getRoute', () => {
    const TICKS = 'TICKS';
    const SUMMARY = 'SUMMARY';
    const TICK = 'TICK';

    it(`Gets route for ${TICKS}`, () => {
        const route = getRoute(TICKS, 'BTC-LSK', IntervalKeys.THIRTY_MINS);
        const expectedRoute = stringFormat(Routes[TICKS], 'BTC-LSK', IntervalKeys.THIRTY_MINS);
        expect(route).toEqual(expectedRoute);
    });

    it(`Gets route for ${SUMMARY}`, () => {
        const route = getRoute(SUMMARY);
        const expectedRoute = Routes[SUMMARY];
        expect(route).toEqual(expectedRoute);
    });

    it(`Gets route for ${TICK}`, () => {
        const route = getRoute(TICK, 'BTC-LSK');
        const expectedRoute = stringFormat(Routes[TICK], 'BTC-LSK');
        expect(route).toEqual(expectedRoute);
    });
});