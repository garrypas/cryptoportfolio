import React from 'react';
import { StyleSheet, Text, View, List, ListView, FlatList, ListItem, StatusBar, Card } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const flatListStyle = {
    width:'100%',
    flex: 1,
};

const flatListItemStyle = {
    padding:20,
    flex: 1,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
}

const headerStyle = {
    padding: 20,
    paddingTop: 50,
    height: 100,
    borderWidth:1,
    width: '100%',
    backgroundColor: '#9999cc'
}

const headerTextStyle = {
    fontWeight: 'bold',
    fontSize: 24
}

const component = class Dashboard extends React.Component {
  constructor(props) {
      super(props);
      this.tick = this.tick.bind(this);
      this.state = null;
  }

  renderRow(rowData, sectionID) {
    return (
        <View style={flatListItemStyle}><Text key={rowData.item.MarketName}>{rowData.item.MarketName}</Text></View>
    );
  }

  render() {
    let markets = this.props.markets;
    const items = markets 
        ? (<FlatList style={ flatListStyle }
            data={ markets }
            renderItem={this.renderRow}
        />)
        : <Text>Loading...</Text>;
    
    return (
        <View style={styles.container}>
            <View style={headerStyle}><Text style={headerTextStyle}>Cryptocurrency Markets</Text></View>
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

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default component;