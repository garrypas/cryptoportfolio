"use strict";

import sinon from 'sinon';
import { AsyncStorage } from 'react-native';

export default class {
    constructor(data) {
        this.data = data;
        this.sandbox = sinon.createSandbox();        
    }

    stub() {
        this.sandbox.stub(AsyncStorage, 'getItem').callsFake(key => Promise.resolve(this.data[key]));
    }

    restore() {
        this.sandbox.restore();
    }
}