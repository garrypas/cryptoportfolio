"use strict";

import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import styles from './Dashboard.css.js';
import { Actions } from 'react-native-router-flux';
import Ticker from './Ticker';

function getPreviousPrice(previousPrices, key) {
    const match = previousPrices && previousPrices.find(item => item.key === key);
    return match && match.price;
}

const component = class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.state = { };

        this.ticker = new Ticker({
            tick: () => {
                let previousMarkets = this.state.markets;
                this.setState((prevState, currProps) => {
                    return { markets: this.props.markets, previousMarkets: prevState.markets };
                });                
                return this.props.getMarkets();
            },
            interval: 10000,
        });
    }

    viewMarket(market) {
        Actions.market({ market: market.key, title: market.key });
        this.ticker.stopTick();
    }

    renderRow(rowData, sectionID) {
        const previousPrice = getPreviousPrice(this.state.previousMarkets, rowData.item.key);
        const currentPrice = rowData.item.price;
        const priceStyle = [ styles.itemPriceText ];
        let direction = '';
        if(previousPrice > currentPrice) {
            direction = 'down';
        }
        if(currentPrice > previousPrice) {
            direction = 'up';
        }
        return (
            <TouchableOpacity style={styles.flatListItemStyle} onPress={() => this.viewMarket(rowData.item)}>
                <View style={styles.itemName}><Text style={styles.itemNameText}>{rowData.item.title}</Text></View>
                <View style={styles.itemPrice}><Text style={ [ priceStyle, (direction === 'up' ? styles.itemPriceTextUp : direction === 'down' ? styles.itemPriceTextDown : '') ] } >{currentPrice.toFixed(8)}</Text></View>
            </TouchableOpacity>
        );
    }

    render() {
        console.log('rendering...');
        console.log(this.state.markets);
        
        let markets = this.state.markets;
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
        this.ticker.tick();
    }

    componentWillUnmount() {
        this.ticker.stopTick();
    }
}



export default component;