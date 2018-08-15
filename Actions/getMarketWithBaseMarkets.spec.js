"use strict";

import getMarketWithBaseMarkets from './getMarketWithBaseMarkets'
const ticksMock = require('../mocks/ticksMock.json')
import AxiosStub from '../stubs/AxiosStub';
import sinon from 'sinon';
import Intervals from '../constants/Intervals';
import IntervalKeys from '../constants/IntervalKeys';

describe('getMarketWithBaseMarkets', () => {
    let axiosStub;
    const args = { intervalKey: 'ONE_DAY', exchanges: [{ exchange: 'Bittrex', baseCurrency: 'BTC', quoteCurrency: 'ARK' }] };

    beforeEach(() => {
        axiosStub = new AxiosStub();
        axiosStub.stub(ticksMock);
    });

    afterEach(() => axiosStub.restore());

    it('Dispatches result', done => {
        getMarketWithBaseMarkets(args, () => done()).catch(console.error);
    });
});