import React from 'react';
import { StyleSheet, Text, View, List, ListView, FlatList, ListItem, StatusBar, Card } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import styles from './Dashboard.css.js';

const component = class Dashboard extends React.Component {
  constructor(props) {
      super(props);
      this.tick = this.tick.bind(this);
      this.state = null;
  }

  renderRow(rowData, sectionID) {
    return (
        <View style={styles.flatListItemStyle}>
            <View style={styles.itemName}><Text style={styles.itemNameText}>{rowData.item.title}</Text></View>
            <View style={styles.itemPrice}><Text style={styles.itemPriceText}>{rowData.item.price}</Text></View>
        </View>
    );
  }

  render() {
    let markets = this.props.markets;
    const items = markets 
        ? (<FlatList style={ styles.flatListStyle }
            data={ markets }
            renderItem={this.renderRow}
        />)
        : <Text>Loading...</Text>;
    
    return (
        <View style={styles.container}>
            <View style={styles.headerStyle}><Text style={styles.headerTextStyle}>Cryptocurrency Markets</Text></View>
            {items}
        </View>
    );
  }

  componentDidMount() {
    this.timer = setTimeout(this.tick, 2000);
    this.tick();
  }

  tick() {
      this.props.getMarkets();
  }
}

export default component;