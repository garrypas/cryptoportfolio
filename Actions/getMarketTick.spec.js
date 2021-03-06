"use strict";

import getMarketTick from './getMarketTick'
const tickMock = require('../mocks/tickMock.json')
import sinon from 'sinon';
import AxiosStub from '../stubs/AxiosStub';
import IntervalKeys from '../constants/IntervalKeys';

describe('getMarketTick', () => {
    let axiosStub;
    const args = { interval: IntervalKeys.ONE_DAY, exchanges: [{ exchange: 'Bittrex', baseCurrency: 'BTC', quoteCurrency: 'ARK' }] };
    beforeEach(() => {
        axiosStub = new AxiosStub();
        axiosStub.stub(tickMock);
    });

    afterEach(() => axiosStub.restore());

    it('Dispatches result', done => {
        getMarketTick(args, () => done()).catch(console.error);
    });

    it('Returns tick data', done => {
        const dispatch = result => {
            expect(typeof result.data[0].data).toEqual('object');
            done();
        }
        getMarketTick(args, dispatch).catch(console.error);
    });

    it('Maps exchange name', done => {
        const dispatch = result => {
            expect(result.data[0].exchange).toEqual('Bittrex');
            done();
        }
        getMarketTick(args, dispatch).catch(console.error);
    });

    it('Maps base currency', done => {
        const dispatch = result => {
            expect(result.data[0].baseCurrency).toEqual('BTC');
            done();
        }
        getMarketTick(args, dispatch).catch(console.error);
    });

    it('Maps quote currency', done => {
        const dispatch = result => {
            expect(result.data[0].quoteCurrency).toEqual('ARK');
            done();
        }
        getMarketTick(args, dispatch).catch(console.error);
    });

    it('Maps type', done => {
        const dispatch = result => {
            expect(result.type).toEqual('MarketTick');
            done();
        }
        getMarketTick(args, dispatch).catch(console.error);
    });
});