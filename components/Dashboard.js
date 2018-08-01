"use strict";

import React from 'react';
import { StyleSheet, Text, View, List, ListView, FlatList, ListItem, StatusBar, Card, TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import styles from './Dashboard.css.js';
import { Actions } from 'react-native-router-flux';
import Ticker from './Ticker';

const component = class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.state = null;

        this.ticker = new Ticker({
            tick: this.props.getMarkets,
            interval: 2000,
        });
    }

    viewMarket(market) {
        Actions.market({ market: market.key, title: market.key });
        this.ticker.stopTick();
    }

    renderRow(rowData, sectionID) {
        return (
            <TouchableOpacity style={styles.flatListItemStyle} onPress={() => this.viewMarket(rowData.item)}>
                <View style={styles.itemName}><Text style={styles.itemNameText}>{rowData.item.title}</Text></View>
                <View style={styles.itemPrice}><Text style={styles.itemPriceText}>{rowData.item.price}</Text></View>
            </TouchableOpacity>
        );
    }

    render() {
        let markets = this.props.markets;
        const items = markets
            ? (<FlatList style={styles.flatListStyle}
                data={markets}
                renderItem={this.renderRow}
            />)
            : <Text>Loading...</Text>;

        return (
            <View style={styles.container} onEnter={this.tick}>
                {items}
            </View>
        );
    }

    componentDidMount() {
        this.ticker.tick();
    }

    componentWillUnmount() {
        this.ticker.stopTick();
    }
}



export default component;