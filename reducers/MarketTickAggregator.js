"use strict";

import _ from 'lodash';

module.exports = {
    aggregate: (dataSets) => {
        return {
            last: _.mean(dataSets.map(d => d.last))
        };
    }
};