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

    this.ticker = new Ticker({
      tick: () => this.props.getMarket(this.props.market),
      interval: 2000,
    });
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
            <Text style={ styles.itemPrice }>{this.props.latestPrice} {this.props.units}</Text>
          </View>
          <View style={styles.body}>
            <VictoryChart>
              <VictoryAxis tickFormat={ tick => DateFormatter('thirtyMin', tick) } />
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

  componentDidMount() {
    this.ticker.tick();
  }

  componentWillUnmount() {
    this.ticker.stopTick();
  }
}