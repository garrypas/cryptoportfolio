"use strict";

import moveMyCurrency from './moveMyCurrency';
import AsyncStorageStub from '../stubs/AsyncStorageStub';

describe('moveMyCurrency', () => {
    let asyncStorageStub;

    beforeEach(() => {
        const myCurrencies = [];
        const data = {
            myCurrencies: myCurrencies
        };
        asyncStorageStub = new AsyncStorageStub();
        asyncStorageStub.stub(data);
    });

    afterEach(() => asyncStorageStub.restore());

    it('Dispatches result', done => {
        moveMyCurrency({ myCurrencies: [] }, () => done());
    });

    it('Moves my currency from start of list and saves to persistent storage', done => {
        const myCurrencies = [{key: 'BTC-ARK'}, {key: 'BTC-LSK'}, {key: 'BTC-STRAT'}];
        moveMyCurrency({ myCurrencies, from: 0, to: 1 }, data => {
            expect(data.myCurrencies).toHaveLength(3);
            expect(data.myCurrencies[0]).toEqual('BTC-LSK');
            expect(data.myCurrencies[1]).toEqual('BTC-ARK');
            expect(data.myCurrencies[2]).toEqual('BTC-STRAT');
            done();
        });
    });

    it('Moves my currency from end of list and saves to persistent storage', done => {
        const myCurrencies = [{key: 'BTC-ARK'}, {key: 'BTC-LSK'}, {key: 'BTC-STRAT'}];
        moveMyCurrency({ myCurrencies, from: 2, to: 1 }, data => {
            expect(data.myCurrencies).toHaveLength(3);
            expect(data.myCurrencies[0]).toEqual('BTC-ARK');
            expect(data.myCurrencies[1]).toEqual('BTC-STRAT');
            expect(data.myCurrencies[2]).toEqual('BTC-LSK');
            done();
        });
    });

    it('Moves my currency from middle of list to start and saves to persistent storage', done => {
        const myCurrencies = [{key: 'BTC-ARK'}, {key: 'BTC-LSK'}, {key: 'BTC-STRAT'}];
        moveMyCurrency({ myCurrencies, from: 1, to: 0 }, data => {
            expect(data.myCurrencies).toHaveLength(3);
            expect(data.myCurrencies[0]).toEqual('BTC-LSK');
            expect(data.myCurrencies[1]).toEqual('BTC-ARK');
            expect(data.myCurrencies[2]).toEqual('BTC-STRAT');
            done();
        });
    });

    it('Moves my currency from middle of list to end and saves to persistent storage', done => {
        const myCurrencies = [{key: 'BTC-ARK'}, {key: 'BTC-LSK'}, {key: 'BTC-STRAT'}];
        moveMyCurrency({ myCurrencies, from: 1, to: 2 }, data => {
            expect(data.myCurrencies).toHaveLength(3);
            expect(data.myCurrencies[0]).toEqual('BTC-ARK');
            expect(data.myCurrencies[1]).toEqual('BTC-STRAT');
            expect(data.myCurrencies[2]).toEqual('BTC-LSK');
            done();
        });
    });
});