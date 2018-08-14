"use strict";

import getMarket from './getMarket';

export default function (args = {}, dispatch) {
    console.log(args);
    getMarket(args, data => {
        dispatch({
            ...data,
            intervalIndex: args.intervalIndex,
            type: 'ChangeInterval',
        });
    })
};