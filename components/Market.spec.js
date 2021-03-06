"use strict";

import React from 'react';
import Market from './Market';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import Ticker from './Ticker';

describe('Market', () => {
  let tickSpy;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    tickSpy = sandbox.stub(Ticker.prototype, 'tick').returns(undefined);
  });

  afterEach(() => 
    sandbox.restore());

  function render() {
    const props = {
      getMarket: () => Promise.resolve(),
      getMarketTick: () => {},
    };
    const market = <Market { ...props } />;
    return renderer.create(market).toJSON();
  }

  it('renders Market without crashing', () => 
    expect(render()).toBeTruthy());

  it('Starts ticker once component is mounted', () => {
    render();
    sinon.assert.calledTwice(tickSpy);
  });
});