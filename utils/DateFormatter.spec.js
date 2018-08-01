"use strict";

import sinon from 'sinon';
import thirtyMinDateFormatter from './ThirtyMinDateFormatter';
import dateFormatter from './DateFormatter';

describe('DateFormatter', () => {
  let tickSpy;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    tickSpy = sandbox.stub(thirtyMinDateFormatter, 'format').returns(undefined);
  });

  afterEach(() => 
    sandbox.restore());

	it('Calls correct formatter - thirtyMin', () => {
		dateFormatter('thirtyMin', '2018-07-11T08:50:00"');
		sinon.assert.calledOnce(tickSpy);
	});
});