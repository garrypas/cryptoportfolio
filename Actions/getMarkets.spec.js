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

    it('Returns data from exchanges', done => {
        const dispatch = data => {
            expect(data[0].data).toBeTruthy();
            done();
        }
        getMarkets(undefined, dispatch).catch(console.error);
    });

    it('Maps exchange name', done => {
        const dispatch = data => {
            expect(data[0].exchange).toEqual('Bittrex');
            done();
        }
        getMarkets(undefined, dispatch).catch(console.error);
    });
});