"use strict";

import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import styles from './Dashboard.css.js';
import { Actions } from 'react-native-router-flux';
import Ticker from './Ticker';

const component = class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        console.log('Creating dashboard');
        this.renderRow = this.renderRow.bind(this);
        this.state = {};

        this.ticker = new Ticker({
            tick: () => this.tick(),
            interval: 5000,
        });
    }

    tick() {
        if(Actions.currentScene === 'home') {
            this.props.getMarkets({ previous: this.props.markets });
        }
    }

    viewMarket(market) {
        this.ticker.stopTick();
        Actions.market({ market: market.key, title: market.key });
    }

    renderRow(rowData, sectionID) {
        const currentPrice = rowData.item.price;
        const previousPrice = rowData.item.previousPrice;
        const priceStyle = [styles.itemPriceText];
        let direction = '';
        if (previousPrice > currentPrice) {
            direction = 'down';
        }
        if (currentPrice > previousPrice) {
            direction = 'up';
        }
        return (
            <TouchableOpacity style={styles.flatListItemStyle} onPress={() => this.viewMarket(rowData.item)}>
                <View style={styles.itemName}><Text style={styles.itemNameText}>{rowData.item.title}</Text></View>
                <View style={styles.itemPrice}><Text style={[priceStyle, (direction === 'up' ? styles.itemPriceTextUp : direction === 'down' ? styles.itemPriceTextDown : '')]} >{currentPrice.toFixed(8)}</Text></View>
            </TouchableOpacity>
        );
    }

    render() {
        let markets = this.props.markets;
        const items = markets
            ? (
                <FlatList style={styles.flatListStyle}
                    data={markets}
                    renderItem={this.renderRow}
                />)
            : <Text>Loading...</Text>;

        return (
            <View style={styles.container}>
                {items}
            </View>
        );
    }

    componentDidMount() {
        console.log('starting dashboard ticker');
        this.ticker.tick();
    }

    componentWillUnmount() {
        console.log('stopping dashboard ticker');
        this.ticker.stopTick();
    }
}



export default component;