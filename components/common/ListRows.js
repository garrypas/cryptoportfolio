import styles from './ListRows.css';
import React from 'react';
import { TouchableHighlight, TouchableOpacity, View, Text } from 'react-native';

class ListRowBase extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const right = this.props.right ? this.props.right: '';
    return(
        <View style={ { flexDirection: 'row', alignItems: 'center' } }>
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
        <TouchableOpacity style={styles.flatListItemStyle} onPress={ this.props.onPress }>{body}</TouchableOpacity>
      );
  }
}

class BasicListRow extends ListRowBase {
  constructor(props) {
    super(props)
  }

  render() {
    const body = super.render();
    return(
      <TouchableHighlight style={styles.flatListItemStyle}>
        {body}
        </TouchableHighlight>
    );
  }
}

export { BasicListRow, ClickableListRow };
