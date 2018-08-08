"use strict";

import IntervalKeys from './IntervalKeys';

const intervals = {};
intervals[IntervalKeys.ONE_DAY] = {
    intervalKey: IntervalKeys.THIRTY_MINS,
    interval: 30,
    range: 48,
    title: '1 Day',
};

intervals[IntervalKeys.FIVE_DAYS] = {
    intervalKey: IntervalKeys.HOUR,
    interval: 60,
    range: 120,
    title: '5 Days',

};

intervals[IntervalKeys.THIRTY_DAYS] = {
    intervalKey: IntervalKeys.DAY,
    interval: 1440,
    range: 30,
    title: '30 Days',    
};

intervals[IntervalKeys.NINETY_DAYS] = {
    intervalKey: IntervalKeys.DAY,
    interval: 4320,
    range: 90,
    title: '90 Days',
};

module.exports = intervals;