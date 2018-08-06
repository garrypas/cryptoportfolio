"use strict";

import minuteDateFormatter from './MinuteDateFormatter';

module.exports = {
    format: (tick) => minuteDateFormatter(tick, 'HH:mm')
};