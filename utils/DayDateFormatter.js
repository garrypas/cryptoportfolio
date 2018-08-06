"use strict";

import moment from 'moment';

module.exports = {
    format: (tick) => moment(tick).format('DD/MM')
};