"use strict";

import thirtyMinDateFormatter from './ThirtyMinDateFormatter';

describe('ThirtyMinDateFormatter', () => {
	it('Formats', () => {
        const result = thirtyMinDateFormatter.format('2018-07-11T08:50:00');
        expect(result).toEqual('08:50');
	});
});