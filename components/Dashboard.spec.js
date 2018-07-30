import React from 'react';
import Dashboard from './Dashboard';

import renderer from 'react-test-renderer';

it('renders Dashboard without crashing', () => {
  const props = { getMarkets: function() {} };
  const dashboard = <Dashboard />;
  const rendered = renderer.create(dashboard, props).toJSON();
  expect(rendered).toBeTruthy();
});
