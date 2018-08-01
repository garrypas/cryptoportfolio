import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Markets from './containers/Markets';
import Market from './containers/Market';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/RootReducer';
import { Router, Scene, Actions } from 'react-native-router-flux';

const store = createStore(rootReducer);

const component = class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene key="home" component={Markets} initial title="Cryptocurrency Markets" />
            <Scene back onBack={() => Actions.replace('home') } key="market" component={Market} title="Market" />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

export default component;