"use strict";

import removeMyCurrency from './removeMyCurrency';
import AsyncStorageStub from '../stubs/AsyncStorageStub';


describe('removeMyCurrency', () => {
    let asyncStorageStub;
    let myCurrencies;
    beforeEach(() => {
        myCurrencies = ['BTC-ARK'];
        const data = {
            myCurrencies: myCurrencies
        };
        asyncStorageStub = new AsyncStorageStub();
        asyncStorageStub.stub(data);
    });

    afterEach(() => asyncStorageStub.restore());

    it('Dispatches result', done => {
        removeMyCurrency({}, () => done());
    });

    it('Maps market to dispatch payload', done => {
        removeMyCurrency({ market: 'BTC-ARK' }, actionArgs => {
            expect(actionArgs.market).toEqual('BTC-ARK');
            done();
        });
    });

    it('Removes currency from persistent storage', done => {
        removeMyCurrency({ market: 'BTC-ARK' }, data => {
            expect(data.myCurrencies).toHaveLength(0);
            done();
        });
    });

    it('Maps updated currencies to dispatch payload', done => {
        removeMyCurrency({ market: 'BTC-ARK' }, actionArgs => {
            expect(actionArgs.myCurrencies).toHaveLength(0);
            done();
        });
    });
});