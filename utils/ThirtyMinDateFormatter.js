"use strict";

const moment = require('moment');

module.exports = {
    format: (tick) => {
        const formatted = moment(tick).format('HH:mm');
        return formatted;
    },
};