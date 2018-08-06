"use strict";

const intervals = {};
intervals["1Day"] = {
    intervalKey: 'thirtyMin',
    interval: 30,
    range: 48,
    title: '1 Day',
};

intervals["5Days"] = {
    intervalKey: 'hour',
    interval: 60,
    range: 120,
    title: '5 Days',

};

intervals["30Days"] = {
    intervalKey: 'day',
    interval: 1440,
    range: 30,
    title: '30 Days',    
};

module.exports = intervals;