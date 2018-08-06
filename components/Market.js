"use strict";

import React from 'react';
import { Text, View, Image } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import styles from './Market.css.js';
const images = require('./../images');
import { VictoryTheme, VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from 'victory-native';
import Ticker from './Ticker';
import DateFormatter from './../utils/DateFormatter';
import Intervals from '../utils/Intervals'

export default class Market extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.latestPriceTicker = new Ticker({
      tick: () => this.latestPriceTick(),
      interval: 5000,
    });
    this.ticker = new Ticker({
      tick: () => this.tick(),
      interval: Intervals.thirtyMin * 60 * 1000,
    });
  }

  tick() {
    this.props.getMarket({ ...this.props, interval: 'thirtyMin' });
  }

  latestPriceTick() {
    this.props.getMarketTick({ ...this.props, interval: 'thirtyMin' });
  }

  render() {
    let view = (<Text>Loading...</Text>);
    let viewTop = (<Text></Text>)
    if(this.props.latestPrice && this.props.quoteCurrency) {
      const icon = images[this.props.quoteCurrency];
      viewTop = (
        <View style={styles.header}>
            <Text style={ styles.icon }>
              <Image source={ icon } style={ styles.iconImage } />
            </Text>
            <View style={styles.itemPriceContainer}>
              <Text style={ styles.itemPrice }>{this.props.latestPrice.toFixed(8)} {this.props.units}</Text>
              <Text style={ styles.itemOtherInfo }>
                High: { typeof this.props.high === 'number' && this.props.high.toFixed(8) } Low: { typeof this.props.low === 'number' && this.props.low.toFixed(8) } {"\n"}
                Volume: { typeof this.props.volume === 'number' && this.props.volume.toFixed(8) }
              </Text>
            </View>
          </View>
      );
    }
    if(this.props.history) {
      view = (
        <View style={styles.container}>

          <View style={styles.body}>
            <VictoryChart>
              <VictoryAxis tickFormat={ tick => DateFormatter('thirtyMin', tick) } fixLabelOverlap={true} />
              <VictoryAxis dependentAxis tickFormat={ (tick) => '' }/>
              <VictoryLine
                style={{
                  data: { stroke: "#999999" },
                  parent: { border: "1px solid #ccc" },
                }}
                animate={{
                  onLoad: { duration: 500 },
                }}
                data={this.props.historyData}
              />
            </VictoryChart>
          </View>
        </View>
      );
    }
    
    return (
      <View style={styles.container}>{ viewTop } { view }</View>
    );
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