"use strict";

import addToMyCurrencies from './addToMyCurrencies';
import AsyncStorageStub from '../stubs/AsyncStorageStub';


describe('addToMyCurrencies', () => {
    let asyncStorageStub;
    let myCurrencies;
    beforeEach(() => {
        myCurrencies = [];
        const data = {
            myCurrencies: myCurrencies
        };
        asyncStorageStub = new AsyncStorageStub(data);
        asyncStorageStub.stub();
    });

    afterEach(() => asyncStorageStub.restore());

    it('Dispatches result', done => {
        addToMyCurrencies({}, () => done());
    });

    it('Maps market to dispatch payload', done => {
        addToMyCurrencies({ market: 'BTC-ARK' }, actionArgs => {
            expect(actionArgs.market).toEqual('BTC-ARK');
            done();
        });
    });

    it('Adds currency to persistent storage', done => {
        addToMyCurrencies({ market: 'BTC-ARK' }, data => {
            expect(data.myCurrencies).toHaveLength(1);
            expect(data.myCurrencies).toContain('BTC-ARK');
            done();
        });
    });

    it('Creates new myCurrency item in persistent store if value is null', done => {
        addToMyCurrencies({ market: 'BTC-ARK' }, data => {
            expect(data.myCurrencies).toHaveLength(1);
            expect(data.myCurrencies).toContain('BTC-ARK');
            done();
        });
    });

    it('Maps updated currencies to dispatch payload', done => {
        addToMyCurrencies({ market: 'BTC-ARK' }, actionArgs => {
            expect(actionArgs.myCurrencies).toHaveLength(1);
            done();
        });
    });
});