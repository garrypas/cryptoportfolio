"use strict";

import getMarketWithBaseMarkets from './getMarketWithBaseMarkets';

export default function (args = {}, dispatch) {
    getMarketWithBaseMarkets(args, data => {
        dispatch({
            ...data,
            intervalIndex: args.intervalIndex,
            type: 'ChangeInterval',
        });
    })
};