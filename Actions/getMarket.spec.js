"use strict";

import getMarket from './getMarket'
const ticksMock = require('../mocks/ticksMock.json')
import AxiosStub from '../stubs/AxiosStub';
import sinon from 'sinon';

describe('getMarket', () => {
    let axiosStub;
    beforeEach(() => {
        axiosStub = new AxiosStub();
        axiosStub.stub(ticksMock);
    });

    afterEach(() => axiosStub.restore());

    it('Dispatches result', done => {
        getMarket({ market: 'BTC-ARK' }, () => done());
    });

    it('Returns tick data as an array', done => {
        const dispatch = data => {
            expect(Array.isArray(data.data)).toBeTruthy();
            done();
        }
        getMarket({ market: 'BTC-ARK' }, dispatch);
    });
});