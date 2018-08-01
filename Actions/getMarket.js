"use strict";

module.exports = args => {
    return {
        type: 'GET_MARKET',
        market: args && args.market
    }
}