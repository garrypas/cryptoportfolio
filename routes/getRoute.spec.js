"use strict";

import getRoute from  './getRoute';
import stringFormat from 'string-format';
import Routes from './Routes';

describe(' getRoute', () => {
    const TICKS = 'TICKS';
    const SUMMARY = 'SUMMARY';

    it(`Gets route for ${TICKS}`, () => {
        const route = getRoute(TICKS, 'BTC-LSK', 'thirtyMin');
        const expectedRoute = stringFormat(Routes[TICKS], 'BTC-LSK', 'thirtyMin');
        expect(route).toEqual(expectedRoute);
    });

    it(`Gets route for ${SUMMARY}`, () => {
        const route = getRoute(SUMMARY);
        const expectedRoute = Routes[SUMMARY];
        expect(route).toEqual(expectedRoute);
    });
});