"use strict";

import sinon from 'sinon';
import { AsyncStorage } from 'react-native';

export default class {
    constructor() {
        this.sandbox = sinon.createSandbox();        
    }

    stub(data) {
        const _data = { ...data };
        // We need to do this because our array would be stored like this
        // in the real code as we use the AsyncStorageArrayWrapper
        for(var p in _data) {
            if(_data.hasOwnProperty(p)) {
                if(_data[p] instanceof Array) {
                    _data[p] = JSON.stringify({ array: _data[p] });
                }
            }
        }
        
        this.data = _data;

        this.sandbox.stub(AsyncStorage, 'getItem').callsFake(key => {
            let ret = this.data[key];
            return Promise.resolve(ret);
        });
        this.sandbox.stub(AsyncStorage, 'setItem').callsFake((key, value) => new Promise(resolve => {
            this.data[key] = value;
            return resolve();
        }));

    }

    restore() {
        this.sandbox.restore();
    }
}