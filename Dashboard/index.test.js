import React from 'react';
import Dashboard from './index';

import renderer from 'react-test-renderer';

it('renders Dashboard without crashing', () => {
  const rendered = renderer.create(<Dashboard />).toJSON();
  expect(rendered).toBeTruthy();
});
