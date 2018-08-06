"use strict";

import thirtyMinDateFormatter from './ThirtyMinDateFormatter';
import hourDateFormatter from './HourDateFormatter';
import dayDateFormatter from './DayDateFormatter';

module.exports = (interval, tick) => {
	const formatted = typeof tick == 'string' ? Date.parse(tick) : tick;
	switch(interval) {
		case '1Day':
            	return thirtyMinDateFormatter.format(tick);
		case '5Days':
            	return thirtyMinDateFormatter.format(tick);
		case '30Days':
            	return dayDateFormatter.format(tick);
		default:
			throw `Interval '${interval}' not found.`;
	}
};