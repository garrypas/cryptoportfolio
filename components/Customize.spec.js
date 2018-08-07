"use strict";

import React from 'react';
import Customize from './Customize';
import renderer from 'react-test-renderer';
import RouteWrapper from '../routes/RouteWrapper';
import sinon from 'sinon';

describe('Customize', () => {
  let getMyCurrencies;

  function render() {
    const props = { getMyCurrencies: getMyCurrencies };
    const customize = <Customize { ...props } />;
    return renderer.create(customize).toJSON();
  }

  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(RouteWrapper, 'current').returns('customize');
    getMyCurrencies = sandbox.spy();
  });

  afterEach(() =>
    sandbox.restore());

  it('renders Customize without crashing', () =>
    expect(render()).toBeTruthy());

  it('gets my currencies', () => {
    render();
    sandbox.assert.calledOnce(getMyCurrencies);
  });
});