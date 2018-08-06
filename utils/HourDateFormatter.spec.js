"use strict";

import hourDateFormatter from './HourDateFormatter';

describe('HourDateFormatter', () => {
	it('Formats', () => {
        const result = hourDateFormatter.format('2018-07-11T08:50:00');
        expect(result).toEqual('08:50');
	});

    it('Adds date part when midnight', () => {
        const result = hourDateFormatter.format('2018-07-11T00:00:00');
        expect(result).toEqual('00:00\n11/07');
    });
});