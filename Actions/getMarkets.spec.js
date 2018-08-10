"use strict";

import getMarkets from './getMarkets'
const summaryMock = require('../mocks/summaryMock.json')
import AxiosStub from '../stubs/AxiosStub';
import sinon from 'sinon';
import getMyCurrencies from './getMyCurrencies';

describe('getMarkets', () => {
    let axiosStub;
    beforeEach(() => {
        axiosStub = new AxiosStub();
        axiosStub.stub(summaryMock);
    });

    afterEach(() => {
        axiosStub.restore();
    });

    it('Dispatches result', done => {
        getMarkets(undefined, () => done());
    });

    it('Result is an array of data from exchanges', done => {
        const dispatch = data => {
            expect(Array.isArray(data)).toBeTruthy();
            done();
        }
        getMarkets(undefined, dispatch).catch(console.error);
    });

    it('Returns exchange summary data as an array', done => {
        const dispatch = data => {
            expect(Array.isArray(data[0].data)).toBeTruthy();
            done();
        }
        getMarkets(undefined, dispatch).catch(console.error);
    });
});