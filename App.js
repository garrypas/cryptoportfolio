import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Markets from './containers/Markets';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer);

const component = class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Markets />
      </Provider>
    );
  }
}

export default component;