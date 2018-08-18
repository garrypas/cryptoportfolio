"use strict";

import React from 'react';
import Dashboard from './Dashboard';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import Ticker from './Ticker';
import RouterWrapper from '../routes/RouterWrapper';
import rootReducer from './../reducers/RootReducer';

describe('Dashboard', () => {
  let tickSpy;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(RouterWrapper, 'current').returns('home');
    tickSpy = sandbox.stub(Ticker.prototype, 'tick').returns(undefined);
  });

  afterEach(() => 
    sandbox.restore());

  function render() {
    const props = { getMarkets: () => { } };
    const dashboard = <Dashboard {...props} />;
    const testRenderer = renderer.create(dashboard);
    return testRenderer.toJSON();
  }

  it('renders Dashboard without crashing', () => 
    expect(render()).toBeTruthy());

  it('Starts ticker once component is mounted', () => {
    render();
    sinon.assert.calledOnce(tickSpy);
  });
});