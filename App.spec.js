import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';
import Dashboard from './components/Dashboard';
const sinon = require('sinon');

describe('App', () => {
  beforeEach(() => {
    sinon.stub(Dashboard.prototype, 'componentDidMount').returns(undefined);
  });

  it('renders App without crashing', () => {
    const props = { getMarkets: function() {} };
    const app = <App />;
    const rendered = renderer.create(<App />, props).toJSON();
    expect(rendered).toBeTruthy();
  });
});