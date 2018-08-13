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
        getMarket({ baseCurrency: 'BTC', quoteCurrency: 'ARK', intervalKey: 'ONE_DAY', exchanges: ['Bittrex'] }, () => done()).catch(console.error);
    });

    it('Returns response unchanged', done => {
        const dispatch = resp => {
            expect(Array.isArray(resp.data[0].data.result)).toBeTruthy();
            done();
        }
        getMarket({ baseCurrency: 'BTC', quoteCurrency: 'ARK', intervalKey: 'ONE_DAY', exchanges: ['Bittrex'] }, dispatch).catch(console.error);
    });

    it('Maps range from Intervals', done => {
        const expected = Intervals[IntervalKeys.ONE_DAY].range;
        const dispatch = resp => {
            expect(resp.data[0].range).toEqual(expected);
            done();
        }
        getMarket({ baseCurrency: 'BTC', quoteCurrency: 'ARK', intervalKey: IntervalKeys.ONE_DAY, exchanges: ['Bittrex'] }, dispatch).catch(console.error);
    });

    it('Maps exchange name', done => {
        const expected = Intervals[IntervalKeys.ONE_DAY].range;
        const dispatch = resp => {
            expect(resp.data[0].exchange).toEqual('Bittrex');
            done();
        }
        getMarket({ baseCurrency: 'BTC', quoteCurrency: 'ARK', intervalKey: IntervalKeys.ONE_DAY, exchanges: ['Bittrex'] }, dispatch).catch(console.error);
    });

    it('Sets type to "Market"', done => {
        const dispatch = result => {
            expect(result.type).toEqual('Market');
            done();
        }
        getMarket({ baseCurrency: 'BTC', quoteCurrency: 'ARK', intervalKey: IntervalKeys.ONE_DAY, exchanges: ['Bittrex'] }, dispatch).catch(console.error);
    });
});