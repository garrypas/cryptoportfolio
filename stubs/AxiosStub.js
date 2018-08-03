"use strict";

import sinon from 'sinon';
import axios from 'axios';

export default class {
    constructor() {
        this.sandbox = sinon.createSandbox();        
    }

    stub(data) {
        this.sandbox.stub(axios, 'get').resolves({ data: data })
    }

    restore() {
        this.sandbox.restore();
    }
}