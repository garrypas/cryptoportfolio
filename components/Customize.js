"use strict";

import React from 'react';
import { Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import styles from './Customize.css.js';
import RouteWrapper from '../routes/RouteWrapper';

export default class Customize extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRow(rowData) {
    return (
      <TouchableOpacity style={styles.flatListItemStyle} onPress={() => { }}>
        <View style={styles.itemName}><Text style={styles.itemNameText}>{rowData.item.title}</Text></View>
      </TouchableOpacity>
    )
  }

  render() {
    const myCurrencies = this.props.myCurrencies;
    let view = (<Text>Loading...</Text>);
    if (myCurrencies) {
      view = (
        <FlatList style={styles.flatListStyle}
          data={myCurrencies}
          renderItem={this.renderRow}
        />
      );
    }
    return view;
  }

  componentWillMount() {
    if(RouteWrapper.current() === 'customize') {
      this.props.getMyCurrencies({});
    }
  }
}