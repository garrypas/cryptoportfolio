"use strict";

import getRoute from '../routes/getRoute';
import axios from 'axios';
import getMyCurrencies from './getMyCurrencies';
import getMarkets from './getMarkets';

module.exports = (args = {}, dispatch) => {
    getMarkets(args, markets => {
        getMyCurrencies(args, myCurrencies => {
            dispatch({
                ...myCurrencies,
                ...markets,
            })
        });
    });
}