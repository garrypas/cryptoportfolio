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

export default class Market extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log('Market constructor...');
    this.ticker = new Ticker({
      tick: () => this.tick(),
      interval: 2000,
    });
  }

  tick() {
    console.log('tick');
    this.props.getMarket({ market: this.props.market });
  }

  render() {
    const icon = images[this.props.quoteCurrency];
    let view = (<Text>Loading...</Text>);
    if(this.props.latestPrice) {
      view = (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={ styles.icon }>
              <Image source={ icon } style={ styles.iconImage } />
            </Text>
            <View style={styles.itemPriceContainer}>
              <Text style={ styles.itemPrice }>{this.props.latestPrice.toFixed(8)} {this.props.units}</Text>
              <Text style={ styles.itemOtherInfo }>
                High: { this.props.high.toFixed(8) } Low: { this.props.low.toFixed(8) } {"\n"}
                Volume: { this.props.volume.toFixed(8) }
              </Text>
            </View>
          </View>
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
      <View style={styles.container}>{view}</View>
    );
  }

  componentWillMount() {
    this.ticker.tick();
  }

  componentWillUnmount() {
    this.ticker.stopTick();
  }
}