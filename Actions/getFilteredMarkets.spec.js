"use strict";

const summaryMock = require('../mocks/summaryMock.json')
import AxiosStub from '../stubs/AxiosStub';
import AsyncStorageStub from '../stubs/AsyncStorageStub';
import sinon from 'sinon';
import getFilteredMarkets from './getFilteredMarkets';

describe('getFilteredMarkets', () => {
    let axiosStub;
    let asyncStorageStub;
    const myCurrencies = [];
    let myStorage;

    beforeEach(() => {
        axiosStub = new AxiosStub();
        myStorage = {
            myCurrencies: myCurrencies
        };
        asyncStorageStub = new AsyncStorageStub();
        axiosStub.stub(summaryMock);
        asyncStorageStub.stub(myStorage);
    });

    afterEach(() => {
        axiosStub.restore();
        asyncStorageStub.restore();
    });

    it('Dispatches result', done => {
        getFilteredMarkets(undefined, () => done());
    });

    it('Includes market data in results', done => {
        const dispatch = data => {
            expect(Array.isArray(data.data)).toBeTruthy();
            done();
        }
        getFilteredMarkets(undefined, dispatch).catch(console.error);;
    });

    it('Includes myCurrencies in results', done => {
        const dispatch = data => {
            expect(Array.isArray(data.myCurrencies)).toBeTruthy();
            done();
        }
        getFilteredMarkets(undefined, dispatch).catch(console.error);
    });

    it('Action type is "Markets"', done => {
        const dispatch = data => {
            expect(data.type).toEqual("Markets");
            done();
        }
        getFilteredMarkets(undefined, dispatch).catch(console.error);
    });
});