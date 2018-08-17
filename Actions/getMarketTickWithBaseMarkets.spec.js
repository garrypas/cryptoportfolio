"use strict";

import getMarketTickWithBaseMarkets from './getMarketTickWithBaseMarkets'
const tickMock = require('../mocks/tickMock.json')
import AxiosStub from '../stubs/AxiosStub';
import sinon from 'sinon';
import Intervals from '../constants/Intervals';
import IntervalKeys from '../constants/IntervalKeys';

describe('getMarketTickWithBaseMarkets', () => {
    let axiosStub;
    const args = { intervalKey: 'ONE_DAY', exchanges: [{ exchange: 'Bittrex', baseCurrency: 'BTC', quoteCurrency: 'ARK' }] };

    beforeEach(() => {
        axiosStub = new AxiosStub();
        axiosStub.stub(tickMock);
    });

    afterEach(() => axiosStub.restore());

    it('Dispatches result', done => {
        getMarketTickWithBaseMarkets(args, () => done()).catch(console.error);
    });
});