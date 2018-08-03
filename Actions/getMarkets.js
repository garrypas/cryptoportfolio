"use strict";

import getRoute from '../routes/getRoute';
import axios from 'axios';

module.exports = (args = [], dispatch) => {
    let actionArgs = {
        type: 'GET_MARKETS'
    };

    const route = getRoute('SUMMARY');

    axios.get(route).then(resp => {
        actionArgs.data = resp.data.result;
        dispatch(actionArgs);
        return actionArgs;
    });

    return actionArgs;
}