"use strict";

import React from 'react';
import { Text, View, Button, FlatList, TouchableOpacity, TouchableHighlight, TextInput } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import styles from './Customize.css.js';
import RouteWrapper from '../routes/RouteWrapper';
import Autocomplete from 'react-native-autocomplete-input';
import Swipeable from 'react-native-swipeable';

export default class Customize extends React.Component {
  constructor(props) {
    super(props);
  }

  getSwipeoutButtons(market) {
    return [
      <TouchableHighlight onPress={() => this.props.removeMyCurrency({ market }) } style={{ height: '100%', width: 75, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
        <Text style={{ color:'white' }}>Remove</Text>
      </TouchableHighlight>
    ];
  }

  renderRow(rowData) {
    console.log(rowData);
    return (
      <Swipeable rightButtons={this.getSwipeoutButtons(rowData.item.key)}>
        <TouchableOpacity style={ styles.flatListItemStyle } onPress={() => { }}>
          <View style={styles.itemName}>
            <Text style={ [styles.itemNameText, { zIndex: 999 }] }>{rowData.item.title}</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    )
  }

  render() {
    const myCurrencies = this.props.myCurrencies;
    let view = (<Text>Loading...</Text>);
    console.log(this.props.myCurrencies)
    if (myCurrencies && this.props.markets) {
      view = (
        <View>
          <View style={ styles.searchForm }>
            {<Autocomplete
              placeholder="Enter market name..."
              style={styles.searchInput}
              data={this.props.suggestions}
              onChangeText={searchText => this.props.filterMarkets({ searchText, items: this.props.markets.map(i => i.key) })}
              renderItem={item => (
                <TouchableOpacity onPress={() => this.props.addToMyCurrencies({ market: item })} style={ styles.flatListItemStyle }>
                  <Text>{ item }</Text>
                </TouchableOpacity>
              )}
            />}
          </View>
          <View>
            <FlatList style={styles.flatListStyle}
              data={myCurrencies}
              renderItem={this.renderRow.bind(this)}
            />
          </View>
        </View>
      );
    }
    return view;
  }

  componentWillMount() {
    if (RouteWrapper.current() === 'customize') {
      this.props.getMyCurrencies({ ...this.props });
    }
  }
}