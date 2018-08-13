"use strict";

import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, FlatList, Picker } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import styles from './Dashboard.css.js';
import RouterWrapper from '../routes/RouterWrapper';
import Ticker from './Ticker';
import { ClickableListRow } from './common/ListRows';

const component = class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.state = {};

        this.ticker = new Ticker({
            tick: () => this.tick(),
            interval: 20000,
        });
    }

    tick() {
        if(RouterWrapper.current() === 'home') {
            this.props.getMarkets();
        }
    }

    viewMarket(market) {
        this.ticker.stopTick();
        RouterWrapper.navigate("market", { market: market.key, title: market.key, exchanges: market.exchanges });
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
            <ClickableListRow title={ rowData.item.title } right={
                <View style={styles.itemPrice}><Text style={[priceStyle, (direction === 'up' ? styles.itemPriceTextUp : direction === 'down' ? styles.itemPriceTextDown : '')]} >{currentPrice.toFixed(8)}</Text></View>
            }
            onPress={() => this.viewMarket(rowData.item)}
             />
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
        if(RouterWrapper.current() === 'home') {
            console.log('starting dashboard ticker');
            this.ticker.tick();
        }
    }

    componentWillUnmount() {
        if(RouterWrapper.current() === 'home') {
            console.log('stopping dashboard ticker');
            this.ticker.stopTick();
        }
    }
}



export default component;