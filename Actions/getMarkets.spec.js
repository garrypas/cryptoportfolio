"use strict";

import getMarkets from './getMarkets'
const summaryMock = require('../mocks/summaryMock.json')
import AxiosStub from '../stubs/AxiosStub';
import sinon from 'sinon';
import getMyCurrencies from './getMyCurrencies';

describe('getMarkets', () => {
    let axiosStub;
    let getMyCurrenciesStub;
    beforeEach(() => {
        getMyCurrenciesStub = sinon.stub(getMyCurrencies, '_getMyCurrencies').callsFake((args, dispatch) => {
            dispatch([]);
        })
        axiosStub = new AxiosStub();
        axiosStub.stub(summaryMock);
    });

    afterEach(() => {
        axiosStub.restore();
        getMyCurrenciesStub.restore();
    });

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