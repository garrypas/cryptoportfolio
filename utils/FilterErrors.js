"use strict";

module.exports = {
    filter: (errs) => {
        errs.forEach(e => console.ignoredYellowBox = [errs]);
    }
};