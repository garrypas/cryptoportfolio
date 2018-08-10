"use strict";

import axios from 'axios';
import getMyCurrencies from './getMyCurrencies';
import getMarkets from './getMarkets';

module.exports = (args = {}, dispatch) => {
    return getMarkets(args, exchangesData => {
        return getMyCurrencies(args, myCurrencies => {
            const dispatchPayload = {
                ...myCurrencies,
                type: 'Markets',
                data: exchangesData.map(market => { return { ...market } }),
            };
            dispatch(dispatchPayload)
        });
    });
}