"use strict";

import changeInterval from './changeInterval'
import AxiosStub from './../stubs/AxiosStub';
import getMarketWithBaseMarkets from './getMarketWithBaseMarkets';
const ticksMock = require('../mocks/ticksMock.json')

describe('changeInterval', () => {
    let axiosStub;
    beforeEach(() => {
        axiosStub = new AxiosStub();
        axiosStub.stub(ticksMock);
    });

    afterEach(() => {
        axiosStub.restore();
    });

    it("Dispatches", done => {
        changeInterval({
            exchanges: []
        }, () => {
            done();
        })
    });

    it("Result is dispatched with base data included", done => {
        changeInterval({
            exchanges: []
        }, result => {
            expect(result.baseData).toBeTruthy();
            done();
        })
    });
});