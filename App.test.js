import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';

it('renders App without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});
