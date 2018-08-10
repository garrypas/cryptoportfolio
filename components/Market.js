"use strict";

import React from 'react';
import { Text, View, Image, Button } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import styles from './Market.css.js';
const images = require('./../images');
import { VictoryTheme, VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from 'victory-native';
import Ticker from './Ticker';
import DateFormatter from './../utils/DateFormatter';
import Intervals from '../constants/Intervals'

function renderIntervalButton(key, interval) {
  return (<Button title={interval.title} onPress={() => this.changeInterval(key)} key={"btn" + key} />);
}

export default class Market extends React.Component {
  constructor(props) {
    super(props);
    this.latestPriceTicker = new Ticker({
      tick: () => this.latestPriceTick(),
      interval: 5000,
    });
    this.ticker = new Ticker({
      tick: () => this.tick(),
      interval: Intervals["1Day"].interval * 60 * 1000,
    });
  }

  tick() {
    this.props.getMarket({ ...this.props, interval: this.props.interval });
  }

  latestPriceTick() {
    this.props.getMarketTick({ ...this.props, interval: this.props.interval });
  }

  render() {
    let view = (<Text>Loading...</Text>);
    let viewTop = (<Text></Text>)
    if (this.props.latestPrice && this.props.quoteCurrency) {
      const icon = images[this.props.quoteCurrency];
      viewTop = (
        <View style={styles.header}>
          <Text style={styles.icon}>
            <Image source={icon} style={styles.iconImage} />
          </Text>
          <View style={styles.itemPriceContainer}>
            <Text style={styles.itemPrice}>{this.props.latestPrice.toFixed(8)} {this.props.units === 'BTC' ? 'Sats' : 'BTC'}</Text>
            <Text style={styles.itemOtherInfo}>
              High: {typeof this.props.high === 'number' && this.props.high.toFixed(8)} Low: {typeof this.props.low === 'number' && this.props.low.toFixed(8)} {"\n"}
              Volume: {typeof this.props.volume === 'number' && this.props.volume.toFixed(8)}
            </Text>
          </View>
        </View>
      );
    }
    if (this.props.historyData) {
      const historyData = this.props.historyData;
      view = (
        <View style={styles.body}>
          <VictoryChart padding={{ left: 0, right: 0, top: 0, bottom: 50 }}>
            <VictoryAxis 
              tickLabelComponent={<VictoryLabel dx={20} />} 
              tickFormat={tick => DateFormatter(this.props.interval, tick)}
              fixLabelOverlap={true} 
            />
            <VictoryAxis 
              dependentAxis 
              orientation="right"
              style={ { borderWidth: 0, axis: { stroke: 'white', strokeWidth: 0 } } }
              
              tickLabelComponent={<VictoryLabel textAnchor="end" dx={ -20 }  />}
              
            />
            <VictoryLine
              style={{
                data: { stroke: "#999999" },
                parent: { border: "1px solid #ccc" },
              }}
              animate={{
                onLoad: { duration: 500 },
              }}
              data={historyData}
            />
          </VictoryChart>
        </View>
      );
    }

    let buttons = [];
    for(let b in Intervals) {
      buttons.push(
          renderIntervalButton.bind(this)(b, Intervals[b])
      );
    }

    let intervals = (<View style={styles.buttons}>{buttons}</View>)

    return (
      <View style={styles.container}>{viewTop} {view} {intervals} </View>
    );
  }

  changeInterval(newInterval) {
    if (this.props.interval === newInterval) {
      return;
    }
    this.props.changeInterval({ ...this.props, interval: newInterval });
  }

  componentWillMount() {
    this.ticker.tick();
    this.latestPriceTicker.tick();
  }

  componentWillUnmount() {
    this.ticker.stopTick();
    this.latestPriceTicker.stopTick();
  }
}