"use strict";

import getMarket from './getMarket'
const ticksMock = require('../mocks/ticksMock.json')
import AxiosStub from '../stubs/AxiosStub';
import sinon from 'sinon';
import Intervals from '../constants/Intervals';
import IntervalKeys from '../constants/IntervalKeys';

describe('getMarket', () => {
    let axiosStub;
    beforeEach(() => {
        axiosStub = new AxiosStub();
        axiosStub.stub(ticksMock);
    });

    afterEach(() => axiosStub.restore());

    it('Dispatches result', done => {
        getMarket({ market: 'BTC-ARK', interval: IntervalKeys.ONE_DAY }, () => done());
    });

    it('Returns tick data as an array', done => {
        const dispatch = data => {
            expect(Array.isArray(data.data)).toBeTruthy();
            done();
        }
        getMarket({ market: 'BTC-ARK', interval: IntervalKeys.ONE_DAY }, dispatch);
    });

    it('Maps range from Intervals', done => {
        const expected = Intervals[IntervalKeys.ONE_DAY].range;
        const dispatch = data => {
            expect(data.range).toEqual(expected);
            done();
        }
        getMarket({ market: 'BTC-ARK', interval: IntervalKeys.ONE_DAY }, dispatch);
    });

    it('Maps exchange name', done => {
        const expected = Intervals[IntervalKeys.ONE_DAY].range;
        const dispatch = data => {
            expect(data.exchange).toEqual('Bittrex');
            done();
        }
        getMarket({ market: 'BTC-ARK', interval: IntervalKeys.ONE_DAY }, dispatch);
    });
});