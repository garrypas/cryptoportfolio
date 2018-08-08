"use strict";

import thirtyMinDateFormatter from './ThirtyMinDateFormatter';
import hourDateFormatter from './HourDateFormatter';
import dayDateFormatter from './DayDateFormatter';
import IntervalKeys from '../constants/IntervalKeys';

module.exports = (interval, tick) => {
	const formatted = typeof tick == 'string' ? Date.parse(tick) : tick;
	switch(interval) {
		case IntervalKeys.ONE_DAY:
            	return thirtyMinDateFormatter.format(tick);
		case IntervalKeys.FIVE_DAYS:
            	return thirtyMinDateFormatter.format(tick);
		case IntervalKeys.THIRTY_DAYS:
            	return dayDateFormatter.format(tick);
		case IntervalKeys.NINETY_DAYS:
            	return dayDateFormatter.format(tick);
		default:
			throw `Interval '${interval}' not found.`;
	}
};