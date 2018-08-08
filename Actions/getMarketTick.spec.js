"use strict";

import getMarketTick from './getMarketTick'
const tickMock = require('../mocks/tickMock.json')
import sinon from 'sinon';
import AxiosStub from '../stubs/AxiosStub';
import IntervalKeys from '../constants/IntervalKeys';

describe('getMarketTick', () => {
    let axiosStub;
    beforeEach(() => {
        axiosStub = new AxiosStub();
        axiosStub.stub(tickMock);
    });

    afterEach(() => axiosStub.restore());

    it('Dispatches result', done => {
        getMarketTick({ market: 'BTC-ARK', interval: IntervalKeys.ONE_DAY }, () => done());
    });

    it('Returns tick data', done => {
        const dispatch = data => {
            expect(typeof data.data).toEqual('object');
            done();
        }
        getMarketTick({ market: 'BTC-ARK', interval: IntervalKeys.ONE_DAY }, dispatch);
    });
});