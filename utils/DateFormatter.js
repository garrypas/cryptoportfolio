"use strict";

import thirtyMinDateFormatter from './ThirtyMinDateFormatter';
import hourDateFormatter from './HourDateFormatter';
import dayDateFormatter from './DayDateFormatter';
import IntervalKeys from '../constants/IntervalKeys';

module.exports = (interval, tick) => {
	const formatted = typeof tick == 'string' ? Date.parse(tick) : tick;
	switch(interval) {
		case IntervalKeys.ONE_DAY:
		case IntervalKeys.FIVE_DAYS:
            	return thirtyMinDateFormatter.format(tick);
		case IntervalKeys.THIRTY_DAYS:
		case IntervalKeys.NINETY_DAYS:
		case IntervalKeys.SIX_MONTHS:
		case IntervalKeys.ONE_YEAR:
            	return dayDateFormatter.format(tick);
		default:
			throw `Interval '${interval}' not found.`;
	}
};