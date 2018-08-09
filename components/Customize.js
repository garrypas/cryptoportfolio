"use strict";

import React from 'react';
import { Text, View, Button, FlatList, TouchableOpacity, TouchableHighlight, TextInput, Keyboard, PureComponent, NativeComponent } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import styles from './Customize.css.js';
import RouteWrapper from '../routes/RouteWrapper';
import Autocomplete from 'react-native-autocomplete-input';
import SortableListView from 'react-native-sortable-listview';
import { SortableListRow } from './common/ListRows.js';

export default class Customize extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRow(rowData) {
    return (
      <SortableListRow title={ rowData.title } right={
          <Button 
            title="Remove" 
            onPress={() => this.props.removeMyCurrency({ market: rowData.key }) } 
            style={ [{justifyContent: 'flex-end', flex: 1, backgroundColor: 'red' }, styles.textButton ] } />
        } />
    );
  }

  render() {
    const myCurrencies = this.props.myCurrencies;
    let view = (<Text>Loading...</Text>);
    if (myCurrencies && this.props.markets) {
      const order = Object.keys(myCurrencies);
      view = (
        <View style={styles.container}>
          <View style={ styles.searchForm }>
            <Autocomplete
              placeholder="Enter market name..."
              style={styles.searchInput}
              data={this.props.suggestions}
              onChangeText={searchText => this.props.filterMarkets({ searchText, items: this.props.allMarkets.map(i => i.key) })}
              renderItem={item => (
                <TouchableOpacity onPress={() => {
                  this.props.addToMyCurrencies({ market: item });
                  Keyboard.dismiss;
                  }} style={ styles.flatListItemStyle }>
                  <Text>{ item }</Text>
                </TouchableOpacity>
              )}
            />
          </View>
            <SortableListView style={[styles.flatListStyle, { flex: 1 }]}
              data={myCurrencies}
              onRowMoved={e => 
                this.props.moveMyCurrency({ myCurrencies: this.props.myCurrencies, to: e.to, from: e.from })
              }
              order={order}
              renderRow={ this.renderRow.bind(this) }
            />
        </View>
      );
    }
    return view;
  }

  componentWillMount() {
    console.log("componentRemount");
    if (RouteWrapper.current() === 'customize') {
      this.props.getMyCurrencies({ ...this.props });
    }
  }
}