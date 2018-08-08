"use strict";

import sinon from 'sinon';
import thirtyMinDateFormatter from './ThirtyMinDateFormatter';
import dateFormatter from './DateFormatter';
import IntervalKeys from '../constants/IntervalKeys';

describe('DateFormatter', () => {
  let tickSpy;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    tickSpy = sandbox.stub(thirtyMinDateFormatter, 'format').returns(undefined);
  });

  afterEach(() => 
    sandbox.restore());

	it('Calls correct formatter - 1Day', () => {
		dateFormatter(IntervalKeys.ONE_DAY, '2018-07-11T08:50:00"');
		sinon.assert.calledOnce(tickSpy);
	});
});