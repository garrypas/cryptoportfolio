"use strict";

import dayDateFormatter from './DayDateFormatter';

describe('DayDateFormatter', () => {
	it('Formats', () => {
        const result = dayDateFormatter.format('2018-07-11T08:50:00');
        expect(result).toEqual('11/07');
	});

    it('Adds date part when midnight', () => {
        const result = dayDateFormatter.format('2018-07-11T00:00:00');
        expect(result).toEqual('11/07');
    });
});