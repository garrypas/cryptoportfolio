"use strict";

import thirtyMinDateFormatter from './ThirtyMinDateFormatter';

module.exports = (interval, tick) => {
	const formatted = typeof tick == 'string' ? Date.parse(tick) : tick;
	switch(interval) {
		case 'thirtyMin':
            return thirtyMinDateFormatter.format(tick);
		default:
			throw `Interval '${interval}' not found.`;
	}
};