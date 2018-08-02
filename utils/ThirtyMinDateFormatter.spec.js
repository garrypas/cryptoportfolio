"use strict";

import thirtyMinDateFormatter from './ThirtyMinDateFormatter';

describe('ThirtyMinDateFormatter', () => {
	it('Formats', () => {
        const result = thirtyMinDateFormatter.format('2018-07-11T08:50:00');
        expect(result).toEqual('08:50');
	});

    it('Adds date part when midnight', () => {
        const result = thirtyMinDateFormatter.format('2018-07-11T00:00:00');
        expect(result).toEqual('00:00\n11/07');
    });
});