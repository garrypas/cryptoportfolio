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
        getMarketTick({ baseCurrency: 'BTC', quoteCurrency: 'ARK', interval: IntervalKeys.ONE_DAY, exchanges: ['Bittrex'] }, () => done()).catch(console.error);
    });

    it('Returns tick data', done => {
        const dispatch = result => {
            expect(typeof result.data[0].data).toEqual('object');
            done();
        }
        getMarketTick({ baseCurrency: 'BTC', quoteCurrency: 'ARK', interval: IntervalKeys.ONE_DAY, exchanges: ['Bittrex'] }, dispatch).catch(console.error);
    });

    it('Maps exchange name', done => {
        const dispatch = result => {
            expect(result.data[0].exchange).toEqual('Bittrex');
            done();
        }
        getMarketTick({ baseCurrency: 'BTC', quoteCurrency: 'ARK', interval: IntervalKeys.ONE_DAY, exchanges: ['Bittrex'] }, dispatch).catch(console.error);
    });

    it('Maps type', done => {
        const dispatch = result => {
            expect(result.type).toEqual('MarketTick');
            done();
        }
        getMarketTick({ baseCurrency: 'BTC', quoteCurrency: 'ARK', interval: IntervalKeys.ONE_DAY, exchanges: ['Bittrex'] }, dispatch).catch(console.error);
    });
});