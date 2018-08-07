import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Markets from './containers/Markets';
import Market from './containers/Market';
import Customize from './containers/Customize';

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
            <Scene key="home" component={Markets} initial title="Markets" renderLeftButton={() => <Button title="Customize" onPress={() => Actions.replace('customize') } />} />
            <Scene back onBack={() => Actions.replace('home') } key="market" component={Market} title="Market" />
            <Scene back onBack={() => Actions.replace('home', store.getState()) } key="customize" component={Customize} title="Customize" />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

export default component;