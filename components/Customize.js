"use strict";

import React from 'react';
import { Text, View, Button, FlatList, TouchableOpacity, TouchableHighlight, TextInput, Keyboard, PureComponent } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import styles from './Customize.css.js';
import RouteWrapper from '../routes/RouteWrapper';
import Autocomplete from 'react-native-autocomplete-input';
// import Swipeable from 'react-native-swipeable';
import SortableListView from 'react-native-sortable-listview';
import { BasicListRow } from './common/ListRows';

export default class Customize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getSwipeoutButtons(market) {
    return [
      <TouchableHighlight onPress={() => this.props.removeMyCurrency({ market }) } style={{ height: '100%', width: 75, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
        <Text style={{ color:'white' }}>Remove</Text>
      </TouchableHighlight>
    ];
  }

  renderRow(rowData) {
    return (
      <BasicListRow title={ rowData.title } right={
          <Button 
          backgroundColor="red"
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
            <SortableListView style={styles.flatListStyle}
              data={myCurrencies}
              onRowMoved={e => {

              }}
              order={ Object.keys(myCurrencies) }
              renderRow={row => 
                this.renderRow(row)
              }
              style={{flex: 1}}
              onMoveStart={() => { console.log('start'); this.setState({ sorting: true }); }}
              onMoveEnd={() => this.setState({ sorting: false })}
            />
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