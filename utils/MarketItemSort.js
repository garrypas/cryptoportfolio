"use strict";

import _ from 'lodash';

module.exports = {
    sort: (items) => _.sortBy(items, ['quoteCurrency', 'baseCurrency', 'exchange'])
};