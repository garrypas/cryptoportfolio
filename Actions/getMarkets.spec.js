"use strict";

import getMarkets from './getMarkets'
const summaryMock = require('../mocks/summaryMock.json')
import AxiosStub from '../stubs/AxiosStub';
import sinon from 'sinon';

describe('getMarkets', () => {
    let axiosStub;
    beforeEach(() => {
        axiosStub = new AxiosStub();
        axiosStub.stub(summaryMock);
    });

    afterEach(() => axiosStub.restore());

    it('Dispatches result', done => {
        getMarkets(undefined, () => done());
    });

    it('Returns summary data as an array', done => {
        const dispatch = data => {
            expect(Array.isArray(data.data)).toBeTruthy();
            done();
        }
        getMarkets(undefined, dispatch);
    });
});