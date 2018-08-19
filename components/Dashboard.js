"use strict";

import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, FlatList, Picker } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import styles from './Dashboard.css.js';
import RouterWrapper from '../routes/RouterWrapper';
import Ticker from './Ticker';
import { ClickableListRow } from './common/ListRows';
const images = require('./../images');
import { PriceText } from './common/PriceText';

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
        if (RouterWrapper.current() === 'home') {
            this.props.getMarkets();
        }
    }

    viewMarket(market) {
        this.ticker.stopTick();
        RouterWrapper.navigate("market", { title: market.key, exchanges: market.exchanges, quoteCurrency: market.quoteCurrency, baseCurrency: market.baseCurrency });
    }

    renderRow(rowData, sectionID) {
        const icon = images[rowData.item.quoteCurrency];
        return (
            <ClickableListRow icon={icon} title={rowData.item.title} right={
                <View style={styles.itemPrice}><PriceText style={styles.itemPriceText} price={rowData.item.price} previousPrice={rowData.item.previousPrice} /></View>
            }
                onPress={() => this.viewMarket(rowData.item)}
            />
        );
    }

    renderItems(markets) {
        if(markets) {
            if(markets.length) {
                return (<FlatList style={styles.flatListStyle}
                    data={markets}
                    renderItem={this.renderRow}
                />);
            } else {
                return (<Text style={styles.textCenter}>Click "Customize" to choose some currencies to track</Text>);
            }
        } else {
            return (<Text style={styles.textCenter}>Loading...</Text>);
        }
    }

    render() {
        let markets = this.props.markets;
        const items = this.renderItems(markets);

        return (
            <View style={styles.container}>
                {items}
            </View>
        );
    }

    componentDidMount() {
        if (RouterWrapper.current() === 'home') {
            this.ticker.tick();
        }
    }

    componentWillMount() {
        if (RouterWrapper.current() === 'home') {
            this.tick();
        }
    }

    componentWillUnmount() {
        if (RouterWrapper.current() === 'home') {
            this.ticker.stopTick();
        }
    }
}



export default component;