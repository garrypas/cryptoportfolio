"use strict";

import fillHoles from './FillHoles';
const ticksData = require('./../mocks/ticksMock.json');

describe('FillHoles', () => {
    let data;
    beforeEach(() => {
        data = ticksData.result.slice();
    });

    it('Fills missing data using previous date', () => {
        let filled = fillHoles(data, 5);
        expect(filled.length).toEqual(5);
        expect(filled[3].T).toEqual("2018-07-11T09:05:00");
    });
});