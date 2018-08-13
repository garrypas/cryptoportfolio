"use strict";

/*
    intervalKeys: we use this to tell the exchange what intervals we want between the days (e.g thirtyMins)
    range: the number of items we need from the data to fill the range selected - e.g. for 5 days with 1 hour gaps
    we need 24 hours * 5 = 120; for 30 days with 1 day gaps we need 30 days * 1 = 30.
    interval: the gap, in minutes, between each data point
    title: the text that describes this range
*/

import IntervalKeys from './IntervalKeys';

const intervals = {};
intervals[IntervalKeys.ONE_DAY] = {
    intervalKey: 'THIRTY_MINS',
    interval: 30,
    range: 48,
    title: '1 Day',
};

intervals[IntervalKeys.FIVE_DAYS] = {
    intervalKey: 'HOUR',
    interval: 60,
    range: 120,
    title: '5 Day',

};

intervals[IntervalKeys.THIRTY_DAYS] = {
    intervalKey: 'DAY',
    interval: 1440,
    range: 30,
    title: '1M',    
};

intervals[IntervalKeys.NINETY_DAYS] = {
    intervalKey: 'DAY',
    interval: 1440,
    range: 90,
    title: '3M',
};

intervals[IntervalKeys.SIX_MONTHS] = {
    intervalKey: 'DAY',
    interval: 1440,
    range: 180,
    title: '6M',
};

intervals[IntervalKeys.ONE_YEAR] = {
    intervalKey: 'DAY',
    interval: 1440,
    range: 365,
    title: '1Y',
};

module.exports = intervals;