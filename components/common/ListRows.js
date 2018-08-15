"use strict";

import styles from './ListRows.css';
import React from 'react';
import { TouchableHighlight, TouchableOpacity, View, Text, Image } from 'react-native';

class ListRowBase extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const right = this.props.right ? this.props.right: '';
    const image = this.props.icon ? <Image source={this.props.icon} style={styles.iconImage} /> : "";
    
    return(
        <View style={ { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1 } }>
          {image}
          <Text style={ styles.flatListItemNameText }>{this.props.title}</Text>
          { right }
        </View>
    );
  }
}

class ClickableListRow extends ListRowBase {
  constructor(props) {
    super(props)
  }

  render() {
      const body = super.render();
      return (
        <TouchableHighlight style={styles.flatListItemStyle} onPress={ this.props.onPress }>{body}</TouchableHighlight>
      );
  }
}

class SortableListRow extends ListRowBase {
  constructor(props) {
    super(props)
  }

  render() {
    const body = super.render();
    return(
      <TouchableOpacity style={styles.flatListItemStyle} {...this.props.sortHandlers}>{body}</TouchableOpacity>
    );
  }
}

export { SortableListRow, ClickableListRow };
