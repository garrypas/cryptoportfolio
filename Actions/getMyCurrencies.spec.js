"use strict";

import getMyCurrencies from './getMyCurrencies'
const tickMock = require('../mocks/tickMock.json')
import AsyncStorageStub from '../stubs/AsyncStorageStub';

describe('getMyCurrencies', () => {
    let asyncStorageStub;
    let data;
    const myCurrencies = [];
    beforeEach(() => {
        data = {
            myCurrencies: myCurrencies
        };
        asyncStorageStub = new AsyncStorageStub(data);
        asyncStorageStub.stub();
    });

    afterEach(() => asyncStorageStub.restore());

    it('Dispatches result', done => {
        getMyCurrencies({ }, () => done());
    });

    it('Gets my currencies from persistent storage', done => {
        const dispatch = data => {
            expect(data.myCurrencies).toEqual(myCurrencies);
            done();
        }
        getMyCurrencies({ }, dispatch);
    });
});